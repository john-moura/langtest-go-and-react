package user

import (
	"database/sql"
	"fmt"
	"log"
)

type School struct {
	db *sql.DB
}

func NewSchool(db *sql.DB) *School {
	return &School{db: db}
}

func (s *School) GetUserByEmail(email string) (*User, error) {

	if s.db == nil {
		log.Printf("DB is nil? %v", s.db == nil)
	}

	rows, err := s.db.Query("SELECT * FROM users WHERE email = $1", email)
	if err != nil {
		return nil, err
	}

	u := new(User)
	for rows.Next() {
		u, err = scanRowIntoUser(rows)

		if err != nil {
			return nil, err
		}
	}

	if u.ID == 0 {
		return nil, fmt.Errorf("user not found")
	}
	return u, nil
}

func scanRowIntoUser(rows *sql.Rows) (*User, error) {
// This function receives a dataset object and retrieves an instance of User.
// The user details are mapped from the dataset to the expected User object
	
	user := new(User)

	err := rows.Scan(
		&user.ID,
		&user.FirstName,
		&user.LastName,
		&user.Email,
		&user.Password,
		&user.CreatedAt,
	)
	if err != nil {
		return nil, err
	}

	return user, nil
}

func (s *School) GetUserByID(id int) (*User, error) {
	rows, err := s.db.Query("SELECT * FROM users WHERE id = $1", id)
	if err != nil {
		return nil, err
	}

	u := new(User)
	for rows.Next() {
		u, err = scanRowIntoUser(rows)

		if err != nil {
			return nil, err
		}
	}

	if u.ID == 0 {
		return nil, fmt.Errorf("user not found")
	}
	return u, nil
}

func (s *School) CreateUser(user User) error {
	_, err := s.db.Exec("INSERT INTO users(first_name, last_name, email, password) VALUES ($1,$2,$3,$4)", user.FirstName, user.LastName, user.Email, user.Password)
	if err != nil {
		return err
	}

	return nil
}
