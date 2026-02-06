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

	rows, err := db.Query("SELECT id, title, test_id FROM test_parts WHERE test_id = 1")
	if err != nil {
		log.Fatal(err)
	}
	defer rows.Close()

	fmt.Println("Test Parts for Test ID 1:")
	for rows.Next() {
		var id int
		var title string
		var testID int
		if err := rows.Scan(&id, &title, &testID); err != nil {
			log.Fatal(err)
		}
		fmt.Printf("ID: %d, Title: %s, TestID: %d\n", id, title, testID)
	}
}
