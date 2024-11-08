package schemas

import "gorm.io/gorm"

type Collection struct {
	gorm.Model
	UserID         uint   `gorm:"not null"`
	CollectionName string `gorm:not null`
	Owner          User   `gorm:"foreignKey:UserID"`
	Words          []Word `gorm:"foreignKey:CollectionID"`
}
