package main

import (
	"database/sql"
	"strconv"

	"github.com/golang-migrate/migrate/v4"
	"github.com/golang-migrate/migrate/v4/database/postgres"
	_ "github.com/golang-migrate/migrate/v4/source/file"
	"github.com/john-moura/langtest/config"
	_ "github.com/lib/pq"

	//"fmt"
	"log"
	"os"
)

func main() {
	// const (
	// 	host     = "127.0.0.1"
	// 	port     = 5432
	// 	user     = "postgres"
	// 	password = "root"
	// 	dbname   = "langtest"
	// )

	psqlInfo := config.Envs.DATABASE_URL
	if psqlInfo == "" {
		psqlInfo = "host=127.0.0.1 port=5432 user=postgres password=root dbname=Langtest sslmode=disable"
	}

	// psqlInfo := fmt.Sprintf("host=%s port=%d user=%s "+
	// 	"password=%s dbname=%s sslmode=disable",
	// 	host, port, user, password, dbname)

	db, err := sql.Open("postgres", psqlInfo)
	if err != nil {
		log.Fatal(err)
		log.Println(err)
	}

	driver, err := postgres.WithInstance(db, &postgres.Config{})
	if err != nil {
		log.Fatal(err)
		log.Println(err)
	}

	m, err := migrate.NewWithDatabaseInstance(
		"file://cmd/migrate/migrations",
		"postgres",
		driver)

	if err != nil {
		log.Fatal(err)
		log.Println(err)
	}

	v, d, _ := m.Version()
	log.Printf("Version: %d, dirty: %v", v, d)

	cmd := os.Args[(len(os.Args) - 1)]
	if cmd == "up" {
		if err := m.Up(); err != nil && err != migrate.ErrNoChange {
			log.Fatal(err)
			log.Println(err)
		}
	}
	if cmd == "down" {
		if err := m.Down(); err != nil && err != migrate.ErrNoChange {
			log.Fatal(err)
		}
	}
	if len(os.Args) > 2 && os.Args[len(os.Args)-2] == "force" {
		version, err := strconv.Atoi(cmd)
		if err != nil {
			log.Fatal(err)
		}
		if err := m.Force(version); err != nil {
			log.Fatal(err)
		}
	}
}
