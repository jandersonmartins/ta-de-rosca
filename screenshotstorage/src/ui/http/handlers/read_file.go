package handlers

import (
	"net/http"
	"strconv"
	"ta-de-rosca/screenshotstorage/src/config"
	storage "ta-de-rosca/screenshotstorage/src/domain/storage"
	"ta-de-rosca/screenshotstorage/src/infra/providers"
	"ta-de-rosca/screenshotstorage/src/ui/http/helpers"
)

// ReadFile handle all GET /files request
func ReadFile(w http.ResponseWriter, r *http.Request) {
	name := r.URL.Query().Get("name")
	if name == "" {
		helpers.JSONError(w, "name required", http.StatusBadRequest)
		return
	}

	file, extension, err := storage.NewReadFile(
		config.GetScreenshotDir(),
		providers.NativeStorage{},
	).Read(name)

	if err != nil {
		helpers.JSONError(w, "can't read the file", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "image/"+extension)
	w.Header().Set("Content-Size", strconv.Itoa(len(file)))
	w.Write(file)
}
