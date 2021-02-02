package main

import (
	"ta-de-rosca/screenshotstorage/src/ui/http/handlers"
	"ta-de-rosca/screenshotstorage/src/ui/http/middlewares"

	"github.com/gorilla/mux"

	"net/http"
)

func main() {
	r := mux.NewRouter()

	r.HandleFunc("/upload", handlers.Upload).Methods(http.MethodPost)
	r.HandleFunc("/files", handlers.ReadFile).Methods(http.MethodGet)

	r.Use(middlewares.LogginMiddleware)

	http.ListenAndServe(":3001", r)
}
