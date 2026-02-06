package subject

import (
	"time"

	"github.com/john-moura/langtest/service/test"
)

type SubjectTests interface {
	GetTests(id, userID int) ([]test.Test, error)
	GetSubject(id int) (*Subject, error)
	GetLatestResults(userID int) (map[string]int, error)
}

type Subject struct {
	ID          int       `json:"id"`
	Name        string    `json:"name"`
	Description string    `json:"description"`
	Icon        string    `json:"icon"`
	CourseID    int       `json:"courseId"`
	CreatedAt   time.Time `json:"createdAt"`
}

type SubjectWithTestsResponse struct {
	Subject Subject     `json:"subject"`
	Tests   []test.Test `json:"tests"`
}
