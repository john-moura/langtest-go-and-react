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

	rows, err := db.Query("SELECT id, user_id, test_id, score, total_questions FROM test_results ORDER BY id DESC LIMIT 1")
	if err != nil {
		log.Fatal(err)
	}
	defer rows.Close()

	fmt.Println("Latest Test Result:")
	for rows.Next() {
		var id, userID, testID, score, totalQuestions int
		if err := rows.Scan(&id, &userID, &testID, &score, &totalQuestions); err != nil {
			log.Fatal(err)
		}
		fmt.Printf("ID: %d, UserID: %d, TestID: %d, Score: %d, TotalQuestions: %d\n", id, userID, testID, score, totalQuestions)
	}
}
