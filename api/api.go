package main

import (
	"context"
	"fmt"
	"net/http"
	"os"
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"

	"github.com/joho/godotenv"
)

func isRoomAvailable(roomId primitive.ObjectID, dbc *mongo.Client) (bool, error) {
	reservations := dbc.Database("demo").Collection("reservations")
	filter := bson.D{{"$and", bson.A{
		bson.D{{"roomId", roomId}},
		bson.D{{"start", bson.D{{"$lte", time.Now().UTC()}}}},
		bson.D{{"end", bson.D{{"$gte", time.Now().UTC()}}}},
	}}}

	if cursor, err := reservations.Find(context.TODO(), filter); err != nil {
		return false, err
	} else {
		var results []ReservationDocument
		if err = cursor.All(context.TODO(), &results); err != nil {
			return false, err
		} else {
			if len(results) == 0 {
				return true, nil
			} else {
				return false, nil
			}
		}
	}
}

func setupRouter(dbc *mongo.Client) *gin.Engine {
	// Disable Console Color
	// gin.DisableConsoleColor()
	r := gin.Default()

	// Ping test
	r.GET("/ping", func(ctx *gin.Context) {
		// Send a ping to confirm a successful connection
		if err := dbc.Database("admin").RunCommand(context.TODO(), bson.D{{Key: "ping", Value: 1}}).Err(); err != nil {
			ctx.JSON(http.StatusInternalServerError, ErrorResponse{"DB connection failed"})
		} else {
			ctx.Status(http.StatusOK)
		}
	})

	// Search
	/*r.GET("/search", func(ctx *gin.Context) {
		var request SearchRequestPayload
		if err := ctx.BindJSON(&request); err != nil {
			ctx.JSON(http.StatusBadRequest, ErrorResponse{"Invalid JSON"})
		} else {
			if start, err := time.Parse(time.RFC3339, request.ReservationStart); err != nil {
				ctx.JSON(http.StatusBadRequest, ErrorResponse{"Invalid start time"})
			} else if end, err := time.Parse(time.RFC3339, request.ReservationEnd); err != nil {
				ctx.JSON(http.StatusBadRequest, ErrorResponse{"Invalid end time"})
			} else {

			}
		}
	})*/

	// Room layout
	r.GET("/layout", func(ctx *gin.Context) {
		var request LayoutRequestPayload
		if err := ctx.ShouldBind(&request); err != nil {
			ctx.JSON(http.StatusBadRequest, ErrorResponse{"Invalid request"})
		} else {
			if facilityId, err := primitive.ObjectIDFromHex(request.FacilityId); err != nil {
				ctx.JSON(http.StatusBadRequest, ErrorResponse{"Invalid facilityId"})
			} else {
				buildings := dbc.Database("demo").Collection("buildings")
				filter := bson.D{{"facilityId", facilityId}}
				if cursor, err := buildings.Find(context.TODO(), filter); err != nil {
					ctx.JSON(http.StatusInternalServerError, ErrorResponse{"Error searching building DB"})
				} else {
					var buildingDocuments []BuildingDocument
					if err = cursor.All(context.TODO(), &buildingDocuments); err != nil {
						ctx.JSON(http.StatusInternalServerError, ErrorResponse{"Error collecting building search results"})
					} else {
						rooms := dbc.Database("demo").Collection("rooms")
						filter := bson.D{{"facilityId", facilityId}}
						if cursor, err := rooms.Find(context.TODO(), filter); err != nil {
							ctx.JSON(http.StatusInternalServerError, ErrorResponse{"Error searching room DB"})
						} else {
							var roomDocuments []RoomDocument
							if err = cursor.All(context.TODO(), &roomDocuments); err != nil {
								ctx.JSON(http.StatusInternalServerError, ErrorResponse{"Error collecting room search results"})
							} else {
								buildingsResponse := make([]Building, len(buildingDocuments))
								for i := range buildingsResponse {
									buildingDoc := buildingDocuments[i]
									buildingsResponse[i] = Building{
										Id:     buildingDoc.Id.Hex(),
										Width:  buildingDoc.Width,
										Height: buildingDoc.Height,
										X:      buildingDoc.X,
										Y:      buildingDoc.Y,
									}
								}
								roomsResponse := make([]Room, len(roomDocuments))
								for i := range roomsResponse {
									roomDoc := roomDocuments[i]

									if isAvailable, err := isRoomAvailable(roomDoc.Id, dbc); err != nil {
										ctx.JSON(http.StatusInternalServerError, ErrorResponse{"Error checking room availability"})
										break
									} else {
										timeSinceActivity := time.Since(roomDoc.LastActivity)
										isOccupied := timeSinceActivity.Minutes() < 5

										roomsResponse[i] = Room{
											Id:                   roomDoc.Id.Hex(),
											Name:                 roomDoc.Name,
											IsAvailable:          isAvailable,
											IsOccupied:           isOccupied,
											Width:                roomDoc.Width,
											Height:               roomDoc.Height,
											X:                    roomDoc.X,
											Y:                    roomDoc.Y,
											Seats:                roomDoc.Seats,
											HasProjector:         roomDoc.HasProjector,
											HasWhiteboard:        roomDoc.HasWhiteboard,
											HasAudioAccomodation: roomDoc.HasAudioAccomodation,
											HasVideoRecording:    roomDoc.HasVideoRecording,
										}
									}
								}

								ctx.JSON(http.StatusOK, LayoutResponsePayload{buildingsResponse, roomsResponse})
							}
						}
					}
				}
			}
		}
	})

	return r
}

func main() {
	// Load dotenv
	err := godotenv.Load()
	if err != nil {
		panic(err)
	}
	uri := os.Getenv("MONGODB_URI")

	// Mongo connection
	serverAPI := options.ServerAPI(options.ServerAPIVersion1)
	opts := options.Client().ApplyURI(uri).SetServerAPIOptions(serverAPI)

	// Create a new client and connect to the server
	client, err := mongo.Connect(context.TODO(), opts)
	if err != nil {
		panic(err)
	}

	defer func() {
		if err = client.Disconnect(context.TODO()); err != nil {
			panic(err)
		}
	}()

	// Send a ping to confirm a successful connection
	if err := client.Database("admin").RunCommand(context.TODO(), bson.D{{"ping", 1}}).Err(); err != nil {
		panic(err)
	}

	fmt.Println("Pinged your deployment. You successfully connected to MongoDB!")

	// Gin setup
	r := setupRouter(client)

	/*r.Use(cors.New(cors.Config{
	    AllowOrigins:     []string{"https://foo.com"},
	    AllowMethods:     []string{"PUT", "PATCH"},
	    AllowHeaders:     []string{"Origin"},
	    ExposeHeaders:    []string{"Content-Length"},
	    MaxAge: 12 * time.Hour,
	}))*/

	r.Use(cors.Default())

	// Listen and Server in 0.0.0.0:8080
	r.Run(":8080")
}
