package handlers

import (
	"bytes"
	"encoding/json"
	"io"
	"mime/multipart"
	"net/http"
	"net/http/httptest"
	"os"
	config "ta-de-rosca/screenshotstorage/src/config"
	"testing"
)

func TestUpload(t *testing.T) {
	t.Run("should return json with filename", func(t *testing.T) {
		filePath := "./fixture/hat.jpg"
		file, err := os.Open(filePath)
		if err != nil {
			t.Error(err)
		}
		defer file.Close()

		body := &bytes.Buffer{}
		writer := multipart.NewWriter(body)
		part, errWriter := writer.CreateFormFile("file", "hat.jpg")
		if errWriter != nil {
			t.Error(err)
		}
		io.Copy(part, file)
		writer.Close()

		req := httptest.NewRequest("POST", "/upload", body)
		req.Header.Set("Content-Type", writer.FormDataContentType())
		res := httptest.NewRecorder()

		Upload(res, req)

		var got map[string]string
		expected := "hat.jpg"

		json.NewDecoder(res.Body).Decode(&got)

		if got["name"] != expected {
			t.Errorf("expected %q got %q", expected, got["name"])
		}

		os.RemoveAll(config.GetScreenshotDir())
	})

	t.Run("should respond json with error when don't send file", func(t *testing.T) {
		req := httptest.NewRequest("POST", "/upload", &bytes.Buffer{})
		res := httptest.NewRecorder()

		Upload(res, req)

		var got map[string]string
		expectedMesage := "file is required"

		json.NewDecoder(res.Body).Decode(&got)

		if res.Result().StatusCode != http.StatusUnprocessableEntity {
			t.Errorf("expected status %d got %d", http.StatusUnprocessableEntity, res.Result().StatusCode)
		}

		if got["message"] != expectedMesage {
			t.Errorf("expected %q got %q", expectedMesage, got["message"])
		}
	})
}
