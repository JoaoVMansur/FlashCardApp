package schemas

import "gorm.io/gorm"

type Collection struct {
	gorm.Model
	UserID         uint `gorm:"not null"`
	CollectionName string
	Cards          []Card `gorm:"foreignKey:CollectionID"`
}
