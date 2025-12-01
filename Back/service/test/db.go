package test

import (
	"database/sql"
)

type TestDB struct {
	db *sql.DB
}

func NewTest(db *sql.DB) *TestDB {
	return &TestDB{db: db}
}

func (c *TestDB) GetTestDetails(testID int) (*Test, error) {
	test := &Test{}

	// Step 1: Get test info
	var shortDesc, desc, image sql.NullString
	err := c.db.QueryRow("SELECT id, name, short_description, description, image, weight, duration, subject_id, course_id FROM tests WHERE id = $1", testID).
		Scan(&test.ID, &test.Name, &shortDesc, &desc, &image, &test.Weight, &test.Duration, &test.SubjectID, &test.CourseID)
	test.ShortDescription = shortDesc.String
	test.Description = desc.String
	test.Image = image.String
	if err != nil {
		return nil, err
	}

	// Step 2: Get parts
	rows, err := c.db.Query("SELECT id, title FROM test_parts WHERE test_id = $1", testID)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	for rows.Next() {
		var part TestPart
		if err := rows.Scan(&part.ID, &part.Title); err != nil {
			return nil, err
		}

		// Step 3: Get descriptions for this part
		descRows, err := c.db.Query("SELECT id, idx, text, header, subheader, image FROM descriptions WHERE test_part_id = $1", part.ID)
		if err != nil {
			return nil, err
		}
		for descRows.Next() {
			var d Description
			var header, subheader, image sql.NullString
			if err := descRows.Scan(&d.ID, &d.Index, &d.Text, &header, &subheader, &image); err != nil {
				return nil, err
			}
			d.Header = header.String
			d.Subheader = subheader.String
			d.Image = image.String
			part.Descriptions = append(part.Descriptions, d)
		}
		descRows.Close()

		// Step 4: Get questions for this part
		qRows, err := c.db.Query("SELECT id, idx, header, subheader, text, image FROM questions WHERE test_part_id = $1", part.ID)
		if err != nil {
			return nil, err
		}
		for qRows.Next() {
			var q Question
			var idx, header, subheader, text, image sql.NullString
			if err := qRows.Scan(&q.ID, &idx, &header, &subheader, &text, &image); err != nil {
				return nil, err
			}
			q.Index = idx.String
			q.Header = header.String
			q.Subheader = subheader.String
			q.Text = text.String
			q.Image = image.String

			// Step 5: Get answers for each question
			aRows, err := c.db.Query("SELECT id, idx, text, is_correct FROM answers WHERE question_id = $1", q.ID)
			if err != nil {
				return nil, err
			}
			for aRows.Next() {
				var a Answer
				var idx sql.NullString
				var isCorrect sql.NullBool
				if err := aRows.Scan(&a.ID, &idx, &a.Text, &isCorrect); err != nil {
					return nil, err
				}
				a.Index = idx.String
				a.IsCorrect = isCorrect.Bool
				q.Answers = append(q.Answers, a)
			}
			aRows.Close()

			part.Questions = append(part.Questions, q)
		}
		qRows.Close()

		test.Parts = append(test.Parts, part)
	}

	return test, nil
}
