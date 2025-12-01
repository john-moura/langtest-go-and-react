package test

import (
	"github.com/gorilla/mux"
)

func (h *Handler) RegisterRoutes(router *mux.Router) {
	router.HandleFunc("/test/{id}", h.handleGetTest).Methods("GET")
}
