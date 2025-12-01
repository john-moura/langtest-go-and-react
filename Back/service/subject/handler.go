package subject

import (
	"fmt"
	"net/http"
	"strconv"

	"github.com/gorilla/mux"
	"github.com/john-moura/langtest/service/auth"
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

	// Get user ID from token
	cookie, err := r.Cookie("token")
	if err != nil {
		utils.WriteError(w, http.StatusUnauthorized, fmt.Errorf("unauthorized"))
		return
	}
	userID, err := auth.GetUserIDFromToken(cookie.Value)
	if err != nil {
		utils.WriteError(w, http.StatusUnauthorized, fmt.Errorf("unauthorized"))
		return
	}

	subjectTests, err := h.subjectTests.GetTests(id, userID)
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

func (h *Handler) handleGetDashboardData(w http.ResponseWriter, r *http.Request) {
	// Get user ID from token
	cookie, err := r.Cookie("token")
	if err != nil {
		utils.WriteError(w, http.StatusUnauthorized, fmt.Errorf("unauthorized"))
		return
	}
	userID, err := auth.GetUserIDFromToken(cookie.Value)
	if err != nil {
		utils.WriteError(w, http.StatusUnauthorized, fmt.Errorf("unauthorized"))
		return
	}

	results, err := h.subjectTests.GetLatestResults(userID)
	if err != nil {
		utils.WriteError(w, http.StatusInternalServerError, fmt.Errorf("failed to fetch dashboard data"))
		return
	}

	utils.WriteJSON(w, http.StatusOK, results)
}
