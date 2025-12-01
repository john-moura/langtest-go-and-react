package test

import (
	"fmt"
	"log"
	"net/http"
	"strconv"

	"github.com/gorilla/mux"
	"github.com/john-moura/langtest/utils"
)

type Handler struct {
	testDetails TestDetails
}

func NewHandler(testDetails TestDetails) *Handler {
	return &Handler{testDetails: testDetails}
}

func (h *Handler) handleGetTest(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r) // extract path variables
	idStr := vars["id"]

	id, err := strconv.Atoi(idStr)

	if err != nil {
		utils.WriteJSON(w, http.StatusBadRequest, map[string]string{"error": "invalid test id"})
		return
	}
	log.Printf("Handling GetTest for ID: %d", id)

	testInfo, err := h.testDetails.GetTestDetails(id)
	if err != nil {
		utils.WriteError(w, http.StatusBadRequest, fmt.Errorf("invalid Test id %w", err))
		return
	}

	response := TestDetailsResponse{
		TestInfo:  testInfo,
		TestParts: testInfo.Parts,
	}
	log.Printf("Returning response with %d parts", len(response.TestParts))

	utils.WriteJSON(w, http.StatusOK, response)
}

func (h *Handler) handleSubmitTest(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	idStr := vars["id"]
	testID, err := strconv.Atoi(idStr)
	if err != nil {
		utils.WriteJSON(w, http.StatusBadRequest, map[string]string{"error": "invalid test id"})
		return
	}

	var req SubmitTestRequest
	if err := utils.ParseJSON(r, &req); err != nil {
		utils.WriteJSON(w, http.StatusBadRequest, map[string]string{"error": "invalid request body"})
		return
	}

	// Fetch test details to get correct answers
	testInfo, err := h.testDetails.GetTestDetails(testID)
	if err != nil {
		utils.WriteError(w, http.StatusInternalServerError, fmt.Errorf("failed to fetch test details: %w", err))
		return
	}

	var results []QuestionResult
	correctCount := 0
	totalQuestions := 0

	// Iterate through all questions in the test
	for _, part := range testInfo.Parts {
		for _, question := range part.Questions {
			totalQuestions++
			var correctAnswerID int
			for _, answer := range question.Answers {
				if answer.IsCorrect {
					correctAnswerID = answer.ID
					break
				}
			}

			submittedAnswerID, ok := req.Answers[question.ID]
			isCorrect := false
			if ok && submittedAnswerID == correctAnswerID {
				isCorrect = true
				correctCount++
			}

			results = append(results, QuestionResult{
				QuestionID:       question.ID,
				SelectedAnswerID: submittedAnswerID,
				CorrectAnswerID:  correctAnswerID,
				IsCorrect:        isCorrect,
			})
		}
	}

	response := TestResultResponse{
		Score:           correctCount,
		TotalQuestions:  totalQuestions,
		CorrectAnswers:  correctCount,
		QuestionResults: results,
	}

	// Save result to DB (hardcoded user ID 1 for now)
	if err := h.testDetails.SaveTestResult(1, testID, correctCount, totalQuestions); err != nil {
		log.Printf("Failed to save test result: %v", err)
		// Don't fail the request, just log the error
	}

	utils.WriteJSON(w, http.StatusOK, response)
}
