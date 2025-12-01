package main

import (
	"database/sql"
	"fmt"
	"log"

	_ "github.com/lib/pq"
)

func main() {
	connStr := "host=127.0.0.1 port=5432 user=postgres password=root dbname=Langtest sslmode=disable"
	db, err := sql.Open("postgres", connStr)
	if err != nil {
		log.Fatal(err)
	}
	defer db.Close()

	var exists bool
	query := "SELECT EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'test_results')"
	err = db.QueryRow(query).Scan(&exists)
	if err != nil {
		log.Fatal(err)
	}
	fmt.Printf("Table test_results exists: %v\n", exists)
}
