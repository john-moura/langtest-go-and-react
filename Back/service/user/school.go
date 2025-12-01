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
	user := new(User)
	var googleID, avatar sql.NullString

	err := rows.Scan(
		&user.ID,
		&user.FirstName,
		&user.LastName,
		&user.Email,
		&user.Password,
		&user.CreatedAt,
		&googleID,
		&avatar,
	)
	if err != nil {
		return nil, err
	}

	if googleID.Valid {
		user.GoogleID = googleID.String
	}
	if avatar.Valid {
		user.Avatar = avatar.String
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
	_, err := s.db.Exec("INSERT INTO users(first_name, last_name, email, password, google_id, avatar) VALUES ($1,$2,$3,$4,$5,$6)", user.FirstName, user.LastName, user.Email, user.Password, user.GoogleID, user.Avatar)
	if err != nil {
		return err
	}

	return nil
}
