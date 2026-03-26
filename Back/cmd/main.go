package main

import (
	"database/sql"
	"log"

	"github.com/john-moura/langtest/cmd/api"
	"github.com/john-moura/langtest/config"
	_ "github.com/lib/pq"
)

func main() {

	psqlInfo := config.Envs.DATABASE_URL

	db, err := sql.Open("postgres", psqlInfo)

	if err != nil {
		log.Fatal(err)
	}

	initStorage(db)

	server := api.NewAPIServer(":8080", db)
	if err := server.Run(); err != nil {
		log.Fatal(err)
	}

}

func initStorage(db *sql.DB) {
	err := db.Ping() // starts DB connection
	if err != nil {
		log.Fatal(err)
	}

	log.Println("DB: successfully connected")
}
