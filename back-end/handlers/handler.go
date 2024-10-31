package handlers

import (
	database "JoaoVMansur/Korean-Portuguese-vocab/data"

	"gorm.io/gorm"
)

var db *gorm.DB

func InitializeHandler() {
	var err error
	db, err = database.InitDb()
	if err != nil {
		panic(err)
	}
}
