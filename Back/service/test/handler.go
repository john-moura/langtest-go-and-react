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
