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

	tables := []string{"test_parts", "descriptions", "questions", "answers"}

	for _, table := range tables {
		fmt.Printf("Table: %s\n", table)
		rows, err := db.Query("SELECT column_name, data_type, is_nullable FROM information_schema.columns WHERE table_name = $1", table)
		if err != nil {
			log.Fatal(err)
		}
		defer rows.Close()

		for rows.Next() {
			var columnName, dataType, isNullable string
			if err := rows.Scan(&columnName, &dataType, &isNullable); err != nil {
				log.Fatal(err)
			}
			fmt.Printf("  - %s (%s, %s)\n", columnName, dataType, isNullable)
		}
		fmt.Println("")
	}
}
