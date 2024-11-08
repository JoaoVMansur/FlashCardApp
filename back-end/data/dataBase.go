package data

import (
	"JoaoVMansur/Korean-Portuguese-vocab/schemas"
	"log"

	"github.com/glebarez/sqlite"
	"gorm.io/gorm"
)

func InitDb() (*gorm.DB, error) {
	var db, err = gorm.Open(sqlite.Open("Sqlite/dataBase.sqlite"), &gorm.Config{})
	if err != nil {
		log.Fatal("Error openning database connection: ", err)
	}
	err = db.AutoMigrate(&schemas.Word{}, &schemas.User{}, &schemas.Collection{})

	if err != nil {
		return nil, err
	}
	return db, nil
}
