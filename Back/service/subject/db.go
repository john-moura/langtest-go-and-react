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

func (c *SubjectDB) GetTests(subjectId int) ([]test.Test, error) {
	if c.db == nil {
		log.Printf("DB is nil? %v", c.db == nil)
	}

	rows, err := c.db.Query("SELECT * FROM tests WHERE subject_id = $1", subjectId)
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
