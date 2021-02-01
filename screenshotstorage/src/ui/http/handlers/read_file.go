package handlers

import (
	"net/http"
	"strconv"
	storage "ta-de-rosca/screenshotstorage/src/domain/storage"
)

func ReadFile(w http.ResponseWriter, r *http.Request) {
	// TODO: handle Read error
	file, extension, _ := storage.NewReadFile().Read(r.URL.Query().Get("name"))

	w.Header().Set("Content-Type", "image/"+extension)
	w.Header().Set("Content-Size", strconv.Itoa(len(file)))
	w.Write(file)
}
