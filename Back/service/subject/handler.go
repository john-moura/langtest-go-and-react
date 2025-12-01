package subject

import (
	"fmt"
	"net/http"
	"strconv"

	"github.com/gorilla/mux"
	"github.com/john-moura/langtest/utils"
)

type Handler struct {
	subjectTests SubjectTests
}

func NewHandler(subjectTests SubjectTests) *Handler {
	return &Handler{subjectTests: subjectTests}
}

func (h *Handler) handleSubject(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r) // extract path variables
	idStr := vars["id"]

	id, err := strconv.Atoi(idStr)

	if err != nil {
		http.Error(w, "invalid subject ID", http.StatusBadRequest)
		return
	}

	subjectInfo, err := h.subjectTests.GetSubject(id)
	if err != nil {
		utils.WriteError(w, http.StatusBadRequest, fmt.Errorf("invalid subject id"))
		return
	}

	// Hardcoded userID = 1 for now
	subjectTests, err := h.subjectTests.GetTests(id, 1)
	if err != nil {
		utils.WriteError(w, http.StatusBadRequest, fmt.Errorf("no tests found for subject"))
		return
	}

	response := SubjectWithTestsResponse{
		Subject: *subjectInfo,
		Tests:   subjectTests,
	}

	utils.WriteJSON(w, http.StatusOK, response)
}
