package main

import (
	"ta-de-rosca/screenshotstorage/src/ui/http/handlers"

	"github.com/gorilla/mux"

	"net/http"
)

func main() {
	r := mux.NewRouter()

	r.HandleFunc("/upload", handlers.Upload).Methods("POST")
	r.HandleFunc("/files", handlers.ReadFile).Methods("GET")

	http.ListenAndServe(":3001", r)
}
