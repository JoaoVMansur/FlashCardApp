package schemas

import (
	"gorm.io/gorm"
)

type User struct {
	gorm.Model
	UserName    string       `gorm:"not null"`
	PassWord    string       `gorm:"not null"`
	Email       string       `gorm:"unique;not null"`
	Collections []Collection `gorm:"foreignKey:UserID"`
}

type ChangePasswordRequest struct {
	CurrentPassword string `json:"currentPassword"`
	NewPassword     string `json:"newPassword"`
	ConfirmPassword string `json:"confirmPassword"`
}

type ResetPasswordRequest struct {
	Email string `json:"email"`
}
