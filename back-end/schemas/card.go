package schemas

import "gorm.io/gorm"

type Card struct {
	gorm.Model
	Front        string `gorm:"not null"`
	Verse        string `gorm:"not null"`
	CollectionID uint   `gorm:"not null"`
}
