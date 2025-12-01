package test

import "time"

type TestDetails interface {
	GetTestDetails(id int) (*Test, error)
	SaveTestResult(userID, testID, score, totalQuestions int) error
}

type Test struct {
	ID               int        `json:"id"`
	Name             string     `json:"name"`
	ShortDescription string     `json:"shortDescription"`
	Description      string     `json:"description"`
	Image            string     `json:"image"`
	Weight           float32    `json:"weight"`
	Duration         int        `json:"duration"` // Duration in minutes
	SubjectID        int        `json:"subjectId"`
	CourseID         int        `json:"courseId"`
	CreatedAt        time.Time  `json:"createdAt"`
	Parts            []TestPart `json:"parts"`
	IsConcluded      bool       `json:"isConcluded"`
	Score            int        `json:"score"`
	TotalQuestions   int        `json:"totalQuestions"`
	ConcludedAt      *time.Time `json:"concludedAt"`
}

type TestDetailsResponse struct {
	TestInfo  *Test      `json:"testInfo"`
	TestParts []TestPart `json:"testParts"`
}

type TestPart struct {
	ID           int           `json:"id"`
	Title        string        `json:"title"`
	CreatedAt    time.Time     `json:"createdAt"`
	Descriptions []Description `json:"descriptions"`
	Questions    []Question    `json:"questions"`
}

type Answer struct {
	ID        int    `json:"id"`
	Index     string `json:"index"`
	Text      string `json:"text"`
	IsCorrect bool   `json:"isCorrect"`
}

type Question struct {
	ID        int      `json:"id"`
	Index     string   `json:"index"`
	Header    string   `json:"header"`
	Subheader string   `json:"subheader"`
	Text      string   `json:"text"`
	Image     string   `json:"image"`
	Answers   []Answer `json:"answers"`
}

type Description struct {
	ID        int    `json:"id"`
	Index     string `json:"index"`
	Text      string `json:"text"`
	Header    string `json:"header"`
	Subheader string `json:"subheader"`
	Image     string `json:"image"`
}

type SubmitTestRequest struct {
	Answers map[int]int `json:"answers"` // QuestionID -> AnswerID
}

type QuestionResult struct {
	QuestionID       int  `json:"questionId"`
	SelectedAnswerID int  `json:"selectedAnswerId"`
	CorrectAnswerID  int  `json:"correctAnswerId"`
	IsCorrect        bool `json:"isCorrect"`
}

type TestResultResponse struct {
	Score           int              `json:"score"`
	TotalQuestions  int              `json:"totalQuestions"`
	CorrectAnswers  int              `json:"correctAnswers"`
	QuestionResults []QuestionResult `json:"questionResults"`
}
