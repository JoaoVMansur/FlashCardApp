package schemas

import "gorm.io/gorm"

type Word struct {
	gorm.Model
	KoreanWord     string     `gorm:"not null"`
	PortugueseWord string     `gorm:"not null"`
	CollectionID   uint       `gorm:"not null"`
	Collection     Collection `gorm:"foreignKey:CollectionID"`
}
