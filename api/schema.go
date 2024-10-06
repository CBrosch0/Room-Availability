package main

import (
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

// API schema

type Building struct {
	Id     string `json:"id"`
	Width  int    `json:"width"`
	Height int    `json:"height"`
	X      int    `json:"x"`
	Y      int    `json:"y"`
}

type Room struct {
	Id                   string `json:"id"`
	Name                 string `json:"name"`
	IsAvailable          bool   `json:"isAvailable"`
	Seats                int    `json:"seats"`
	HasProjector         bool   `json:"hasProjector"`
	HasWhiteboard        bool   `json:"hasWhiteboard"`
	HasAudioAccomodation bool   `json:"hasAudioAccomodation"`
	HasVideoRecording    bool   `json:"hasVideoVecording"`
	IsOccupied           bool   `json:"isOccupied"`
	Width                int    `json:"width"`
	Height               int    `json:"height"`
	X                    int    `json:"x"`
	Y                    int    `json:"y"`
}

type SearchRequestPayload struct {
	Seats                int    `form:"seats"`
	HasProjector         bool   `form:"hasProjector"`
	HasWhiteboard        bool   `form:"hasWhiteboard"`
	HasAudioAccomodation bool   `form:"hasAudioAccomodation"`
	HasVideoRecording    bool   `form:"hasVideoRecording"`
	ReservationStart     string `form:"reservationStart"`
	ReservationEnd       string `form:"reservationEnd"`
	IsOccupied           bool   `form:"isOccupied"`
}

type SearchResponsePayload struct {
	Rooms []Room `json:"rooms"`
}

type LayoutRequestPayload struct {
	FacilityId string `form:"facilityId"`
}

type LayoutResponsePayload struct {
	Buildings []Building `json:"buildings"`
	Rooms     []Room     `json:"rooms"`
}

type ActivityRequestPayload struct {
	RoomId string `form:"roomId"`
}

type ErrorResponse struct {
	Err string `json:"err"`
}

// Database schema

type RoomDocument struct {
	Id                   primitive.ObjectID `bson:"_id"`
	FacilityId           primitive.ObjectID `bson:"facilityId"`
	Name                 string             `bson:"name"`
	Seats                int                `bson:"seats"`
	HasProjector         bool               `bson:"hasProjector"`
	HasWhiteboard        bool               `bson:"hasWhiteboard"`
	HasAudioAccomodation bool               `bson:"hasAudioAccomodation"`
	HasVideoRecording    bool               `bson:"hasVideoVecording"`
	LastActivity         time.Time          `bson:"lastActivity"`
	Width                int                `bson:"width"`
	Height               int                `bson:"height"`
	X                    int                `bson:"x"`
	Y                    int                `bson:"y"`
}

type ReservationDocument struct {
	Id     primitive.ObjectID `bson:"_id"`
	RoomId primitive.ObjectID `bson:"roomId"`
	Start  time.Time          `bson:"start"`
	End    time.Time          `bson:"end"`
}

type BuildingDocument struct {
	Id         primitive.ObjectID `bson:"_id"`
	FacilityId primitive.ObjectID `bson:"facilityId"`
	Width      int                `bson:"width"`
	Height     int                `bson:"height"`
	X          int                `bson:"x"`
	Y          int                `bson:"y"`
}
