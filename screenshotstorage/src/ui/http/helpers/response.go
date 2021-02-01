package helpers

import (
	"encoding/json"
	"net/http"
)

// JSONResponse defines an http response as a JSON response
func JSONResponse(w http.ResponseWriter, status int, payload interface{}) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(status)
	json.NewEncoder(w).Encode(payload)
}

// JSONError send a JSON error response
func JSONError(w http.ResponseWriter, err string, status int) {
	JSONResponse(w, status, map[string]string{"message": err})
}
