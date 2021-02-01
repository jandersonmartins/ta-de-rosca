package handlers

import (
	"io/ioutil"
	"net/http"
	"ta-de-rosca/screenshotstorage/src/storage"
	"ta-de-rosca/screenshotstorage/src/ui/http/helpers"
)

// Upload handle POST /upload requests
func Upload(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	file, head, err := r.FormFile("file")
	if err != nil {
		helpers.JSONError(w, "file is required", http.StatusUnprocessableEntity)
		return
	}
	defer file.Close()

	fileBytes, err := ioutil.ReadAll(file)
	if err != nil {
		helpers.JSONError(w, "can't read file", http.StatusInternalServerError)
		return
	}

	storage.NewSaveFile().Save(fileBytes, head.Filename)

	jsonRes := mountJSON("name", head.Filename)
	helpers.JSONResponse(w, http.StatusOK, jsonRes)
}

func mountJSON(key, value string) map[string]string {
	var m = make(map[string]string)
	m[key] = value
	return m
}
