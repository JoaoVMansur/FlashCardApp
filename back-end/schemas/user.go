package schemas

import (
	"gorm.io/gorm"
)

type User struct {
	gorm.Model
	UserName string `gorm:"not null"`
	PassWord string `gorm:"not null"`
	Email    string `gorm:"unique;not null"`
	Words    []Word
}
