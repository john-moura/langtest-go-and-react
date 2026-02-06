package main

import (
	"database/sql"
	"fmt"
	"log"

	_ "github.com/lib/pq"
)

func main() {
	psqlInfo := "host=127.0.0.1 port=5432 user=postgres password=root dbname=Langtest sslmode=disable"
	db, err := sql.Open("postgres", psqlInfo)
	if err != nil {
		log.Fatal(err)
	}
	defer db.Close()

	tables := []string{"tests", "test_parts", "descriptions", "questions", "answers"}
	for _, t := range tables {
		var count int
		err := db.QueryRow(fmt.Sprintf("SELECT count(*) FROM %s", t)).Scan(&count)
		if err != nil {
			log.Printf("Error counting %s: %v", t, err)
			continue
		}
		fmt.Printf("%s: %d\n", t, count)
	}
}
