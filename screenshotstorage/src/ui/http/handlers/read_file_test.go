package handlers

import (
	"bytes"
	"encoding/json"
	"io/ioutil"
	"net/http"
	"net/http/httptest"
	"os"
	"ta-de-rosca/screenshotstorage/src/config"
	"ta-de-rosca/screenshotstorage/src/domain/storage"
	"ta-de-rosca/screenshotstorage/src/infra/providers"
	"testing"
)

func TestReadFile(t *testing.T) {
	t.Run("should respond file response", func(t *testing.T) {
		file, err := ioutil.ReadFile("./fixture/hat.jpg")
		if err != nil {
			t.Fatal()
		}
		// use usecase to save in correct directory (the same used in read)
		storage.NewSaveFile(
			config.GetScreenshotDir(),
			providers.NewNativeStorage(),
		).Save(file, "hat.jpg")

		req := httptest.NewRequest(http.MethodGet, "/files?name=hat.jpg", &bytes.Buffer{})
		res := httptest.NewRecorder()

		ReadFile(res, req)

		got := res.Result().StatusCode
		expected := http.StatusOK

		if got != expected {
			t.Errorf("expected status %d got %d", expected, got)
		}

		os.RemoveAll(config.GetScreenshotDir())
	})

	t.Run("should respond error when `?name` was not provided", func(t *testing.T) {
		req := httptest.NewRequest(http.MethodGet, "/files", &bytes.Buffer{})
		res := httptest.NewRecorder()

		ReadFile(res, req)

		status := res.Result().StatusCode
		expectedStatus := http.StatusBadRequest
		if status != expectedStatus {
			t.Errorf("expected status %d got %d", expectedStatus, status)
		}

		var jsonReceived map[string]string
		expectedMessage := "name required"

		json.NewDecoder(res.Body).Decode(&jsonReceived)

		if jsonReceived["message"] != expectedMessage {
			t.Errorf("expected %q got %q", expectedMessage, jsonReceived["message"])
		}
	})
}
