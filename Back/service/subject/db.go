package subject

import (
	"database/sql"
	"fmt"
	"log"

	"github.com/john-moura/langtest/service/test"
)

type SubjectDB struct {
	db *sql.DB
}

func NewSubject(db *sql.DB) *SubjectDB {
	return &SubjectDB{db: db}
}

func (c *SubjectDB) GetSubject(subjectId int) (*Subject, error) {

	if c.db == nil {
		log.Printf("DB is nil? %v", c.db == nil)
	}

	rows, err := c.db.Query("SELECT * FROM subjects WHERE id = $1", subjectId)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	t := new(Subject)
	for rows.Next() {
		t, err = scanRowIntoSubject(rows)

		if err != nil {
			return nil, err
		}
	}

	if t.ID == 0 {
		return nil, fmt.Errorf("subject not found")
	}
	return t, nil
}

func scanRowIntoSubject(rows *sql.Rows) (*Subject, error) {
	subject := new(Subject)

	err := rows.Scan(
		&subject.ID,
		&subject.Name,
		&subject.Description,
		&subject.CourseID,
		&subject.Icon,
		&subject.CreatedAt,
	)

	if err != nil {
		return nil, err
	}

	return subject, nil
}

func (c *SubjectDB) GetTests(subjectId, userId int) ([]test.Test, error) {
	if c.db == nil {
		log.Printf("DB is nil? %v", c.db == nil)
	}

	query := `
		SELECT t.id, t.course_id, t.subject_id, t.short_description, t.description, t.weight, t.duration, t.image, t.created_at, t.name,
		CASE WHEN tr.id IS NOT NULL THEN TRUE ELSE FALSE END as is_concluded,
		COALESCE(tr.score, 0) as score,
		COALESCE(tr.total_questions, 0) as total_questions,
		tr.created_at as concluded_at
		FROM tests t
		LEFT JOIN test_results tr ON t.id = tr.test_id AND tr.user_id = $2
		WHERE t.subject_id = $1
	`

	rows, err := c.db.Query(query, subjectId, userId)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var tests []test.Test

	for rows.Next() {
		var test test.Test
		err := rows.Scan(
			&test.ID,
			&test.CourseID,
			&test.SubjectID,
			&test.ShortDescription,
			&test.Description,
			&test.Weight,
			&test.Duration,
			&test.Image,
			&test.CreatedAt,
			&test.Name,
			&test.IsConcluded,
			&test.Score,
			&test.TotalQuestions,
			&test.ConcludedAt,
		)
		if err != nil {
			return nil, err
		}

		tests = append(tests, test)
	}

	if err = rows.Err(); err != nil {
		return nil, err
	}

	if len(tests) == 0 {
		return nil, fmt.Errorf("tests not found")
	}

	return tests, nil
}

func (c *SubjectDB) GetLatestResults(userID int) (map[string]int, error) {
	if c.db == nil {
		log.Printf("DB is nil? %v", c.db == nil)
	}

	query := `
		SELECT DISTINCT ON (s.name) s.name, tr.score, tr.total_questions
		FROM test_results tr
		JOIN tests t ON tr.test_id = t.id
		JOIN subjects s ON t.subject_id = s.id
		WHERE tr.user_id = $1
		ORDER BY s.name, tr.created_at DESC
	`

	rows, err := c.db.Query(query, userID)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	results := make(map[string]int)

	for rows.Next() {
		var subjectName string
		var score, totalQuestions int
		if err := rows.Scan(&subjectName, &score, &totalQuestions); err != nil {
			return nil, err
		}

		if totalQuestions > 0 {
			percentage := (score * 100) / totalQuestions
			results[subjectName] = percentage
		} else {
			results[subjectName] = 0
		}
	}

	if err = rows.Err(); err != nil {
		return nil, err
	}

	return results, nil
}
