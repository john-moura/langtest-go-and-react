package subject

import (
	"github.com/gorilla/mux"
)

func (h *Handler) RegisterRoutes(router *mux.Router) {
	router.HandleFunc("/subject/{id}", h.handleSubject).Methods("GET")
	router.HandleFunc("/dashboard", h.handleGetDashboardData).Methods("GET")
}
