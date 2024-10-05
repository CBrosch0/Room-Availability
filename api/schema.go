package main

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
	Seats                int    `json:"seats"`
	HasProjector         bool   `json:"hasProjector"`
	HasWhiteboard        bool   `json:"hasWhiteboard"`
	HasAudioAccomodation bool   `json:"hasAudioAccomodation"`
	HasVideoRecording    bool   `json:"hasVideoRecording"`
	ReservationStart     string `json:"reservationStart"`
	Reservation_End      string `json:"reservationEnd"`
	IsOccupied           bool   `json:"isOccupied"`
}

type SearchResponsePayload struct {
	Rooms []Room `json:"rooms"`
}

type LayoutRequestPayload struct {
	LayoutId string `json:"layoutId"`
}

type LayoutResponsePayload struct {
	Buildings []Building `json:"buildings"`
	Rooms     []Room     `json:"rooms"`
}

type ActivityRequestPayload struct {
	RoomId string `json:"roomId"`
}

type ErrorResponse struct {
	Err string `json:"err"`
}
