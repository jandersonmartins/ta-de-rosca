package config

import "os"

func GetScreenshotDir() string {
	dir := os.Getenv("SCREENSHOT_DIR")
	if dir == "" {
		return "/tmp/ta-de-rosca/screenshots"
	}
	return dir
}
