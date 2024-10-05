package main

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func setupRouter() *gin.Engine {
	// Disable Console Color
	// gin.DisableConsoleColor()
	r := gin.Default()

	// Ping test
	r.GET("/ping", func(ctx *gin.Context) {
		ctx.JSON(http.StatusOK, Room{123, "ENG2 105", true, 25, true, true, false, true, true})
	})

	// Get user value
	r.GET("/search", func(ctx *gin.Context) {
		var request SearchRequestPayload
		if err := ctx.ShouldBindJSON(&request); err != nil {
			ctx.JSON(http.StatusBadRequest, ErrorResponse{"Invalid JSON"})
		} else {
			ctx.JSON(http.StatusOK, request)
		}
	})

	return r
}

func main() {
	// Gin setup
	r := setupRouter()

	// Listen and Server in 0.0.0.0:8080
	r.Run(":8080")
}
