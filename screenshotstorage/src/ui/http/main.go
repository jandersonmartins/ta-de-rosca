package main

import (
	"net/http"
	handlers "ta-de-rosca/screenshotstorage/src/ui/http/handlers"
)

func main() {
	http.HandleFunc("/upload", handlers.Upload)
	http.HandleFunc("/files", handlers.ReadFile)
	http.ListenAndServe(":3001", nil)
}
