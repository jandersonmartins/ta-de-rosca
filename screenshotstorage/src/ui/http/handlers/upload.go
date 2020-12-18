package handlers

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
	storage "ta-de-rosca/screenshotstorage/src/storage"
)

func Upload(w http.ResponseWriter, r *http.Request) {
	file, head, errorForm := r.FormFile("file")
	if errorForm != nil {
		fmt.Println(errorForm)
	}
	defer file.Close()

	fileBytes, errFileBytes := ioutil.ReadAll(file)
	if errFileBytes != nil {
		fmt.Println("errFileBytes", errFileBytes)
	}

	storage.NewSaveFile().Save(fileBytes, head.Filename)

	w.Header().Set("Content-Type", "application/json")
	res := map[string]string{"name": head.Filename}
	json.NewEncoder(w).Encode(res)
}
