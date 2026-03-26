package main

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"log"
	"os"
	"path/filepath"
	"sort"
	"strconv"

	"github.com/john-moura/langtest/config"
	_ "github.com/lib/pq"
)

type JSONTestFile struct {
	TestInfo  JSONTestInfo   `json:"testInfo"`
	TestParts []JSONTestPart `json:"testParts"`
}

type JSONTestInfo struct {
	Name        string `json:"name"`
	Category    string `json:"category"`
	Description string `json:"description"`
	Weight      string `json:"weight"`
	Image       string `json:"image"`
	Duration    int    `json:"duration"`
}

type JSONTestPart struct {
	PartType     string                     `json:"partType"`
	Title        string                     `json:"title"`
	Descriptions map[string]JSONDescription `json:"descriptions"`
	Questions    map[string]JSONQuestion    `json:"questions"`
}

type JSONDescription struct {
	Index     string `json:"index"`
	Text      string `json:"text"`
	Header    string `json:"header"`
	Subheader string `json:"subheader"`
	Image     string `json:"image"`
}

type JSONQuestion struct {
	Index     string                `json:"index"`
	Header    string                `json:"header"`
	Subheader string                `json:"subheader"`
	Text      string                `json:"text"`
	Image     string                `json:"image"`
	Answers   map[string]JSONAnswer `json:"answers"`
}

type JSONAnswer struct {
	Index     string      `json:"index"`
	Text      string      `json:"text"`
	IsCorrect interface{} `json:"isCorrect"`
}

func main() {
	psqlInfo := config.Envs.DATABASE_URL
	db, err := sql.Open("postgres", psqlInfo)
	if err != nil {
		log.Fatal(err)
	}
	defer db.Close()

	if err := db.Ping(); err != nil {
		log.Fatal("Cannot connect to database:", err)
	}

	_, err = db.Exec(`
		INSERT INTO courses (id, course_name, description) 
		VALUES (1, 'Default Course', 'Default Description')
		ON CONFLICT (id) DO NOTHING`)
	if err != nil {
		log.Printf("Warning: failed to seed default course: %v", err)
	}

	_, err = db.Exec(`
		INSERT INTO subjects (id, name, description, course_id, icon) 
		VALUES (1, 'Default Subject', 'Default Description', 1, 'default_icon.png')
		ON CONFLICT (id) DO NOTHING`)
	if err != nil {
		log.Printf("Warning: failed to seed default subject: %v", err)
	}

	jsonDir := "B1_Tests_JSON_All"
	files, err := os.ReadDir(jsonDir)
	if err != nil {
		log.Fatal(err)
	}

	// Sort files to ensure stable order (optional but nice)
	sort.Slice(files, func(i, j int) bool {
		return files[i].Name() < files[j].Name()
	})

	for _, file := range files {
		if filepath.Ext(file.Name()) != ".json" {
			continue
		}

		filePath := filepath.Join(jsonDir, file.Name())
		fmt.Printf("Processing %s...\n", file.Name())

		if err := seedFile(db, filePath); err != nil {
			log.Printf("Error seeding file %s: %v", file.Name(), err)
		}
	}

	fmt.Println("Seeding completed!")
}

func seedFile(db *sql.DB, filePath string) error {
	data, err := os.ReadFile(filePath)
	if err != nil {
		return err
	}

	var testFile JSONTestFile
	if err := json.Unmarshal(data, &testFile); err != nil {
		return err
	}

	var exists bool
	err = db.QueryRow("SELECT EXISTS(SELECT 1 FROM tests WHERE name = $1)", testFile.TestInfo.Name).Scan(&exists)
	if err != nil {
		return fmt.Errorf("check existing test: %v", err)
	}
	if exists {
		fmt.Printf("Test '%s' already exists, skipping.\n", testFile.TestInfo.Name)
		return nil
	}

	tx, err := db.Begin()
	if err != nil {
		return err
	}
	defer tx.Rollback()

	// 1. Insert Test
	weight, _ := strconv.ParseFloat(testFile.TestInfo.Weight, 64)
	var testID int
	err = tx.QueryRow(`
		INSERT INTO tests (name, short_description, description, image, weight, duration, course_id, subject_id, created_at)
		VALUES ($1, $2, $3, $4, $5, $6, $7, $8, NOW())
		RETURNING id`,
		testFile.TestInfo.Name, testFile.TestInfo.Category, testFile.TestInfo.Description,
		testFile.TestInfo.Image, weight, testFile.TestInfo.Duration, 1, 1).Scan(&testID)
	if err != nil {
		return fmt.Errorf("insert test: %v", err)
	}

	// 2. Insert Test Parts
	for _, part := range testFile.TestParts {
		var partID int
		err = tx.QueryRow(`
			INSERT INTO test_parts (test_id, part_type, title, created_at)
			VALUES ($1, $2, $3, NOW())
			RETURNING id`,
			testID, part.PartType, part.Title).Scan(&partID)
		if err != nil {
			return fmt.Errorf("insert test part: %v", err)
		}

		// 3. Insert Descriptions
		// Sort keys to maintain order
		descKeys := make([]string, 0, len(part.Descriptions))
		for k := range part.Descriptions {
			descKeys = append(descKeys, k)
		}
		sort.Strings(descKeys)

		for _, k := range descKeys {
			d := part.Descriptions[k]
			_, err = tx.Exec(`
				INSERT INTO descriptions (test_part_id, index, header, subheader, text, image, created_at)
				VALUES ($1, $2, $3, $4, $5, $6, NOW())`,
				partID, d.Index, d.Header, d.Subheader, d.Text, d.Image)
			if err != nil {
				return fmt.Errorf("insert description: %v", err)
			}
		}

		// 4. Insert Questions
		qKeys := make([]string, 0, len(part.Questions))
		for k := range part.Questions {
			qKeys = append(qKeys, k)
		}
		sort.Strings(qKeys)

		for _, k := range qKeys {
			q := part.Questions[k]
			var qID int
			err = tx.QueryRow(`
				INSERT INTO questions (test_part_id, index, header, subheader, text, image, created_at)
				VALUES ($1, $2, $3, $4, $5, $6, NOW())
				RETURNING id`,
				partID, q.Index, q.Header, q.Subheader, q.Text, q.Image).Scan(&qID)
			if err != nil {
				return fmt.Errorf("insert question: %v", err)
			}

			// 5. Insert Answers
			aKeys := make([]string, 0, len(q.Answers))
			for ak := range q.Answers {
				aKeys = append(aKeys, ak)
			}
			sort.Strings(aKeys)

			for _, ak := range aKeys {
				a := q.Answers[ak]
				isCorrect := false
				if b, ok := a.IsCorrect.(bool); ok {
					isCorrect = b
				} else if s, ok := a.IsCorrect.(string); ok && s != "" {
					// In some JSON files, it might be a string "true" or similar, but based on observation it's "" for false.
					isCorrect = (s == "true" || s == "1" || s == "v")
				}

				_, err = tx.Exec(`
					INSERT INTO answers (question_id, index, text, is_correct, created_at)
					VALUES ($1, $2, $3, $4, NOW())`,
					qID, a.Index, a.Text, isCorrect)
				if err != nil {
					return fmt.Errorf("insert answer: %v", err)
				}
			}
		}
	}

	return tx.Commit()
}
