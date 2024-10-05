package main

type Room struct {
	Id                   int    `json:"id"`
	Name                 string `json:"name"`
	IsAvailable          bool   `json:"is_available"`
	Seats                int    `json:"seats"`
	HasProjector         bool   `json:"has_projector"`
	HasWhiteboard        bool   `json:"has_whiteboard"`
	HasAudioAccomodation bool   `json:"has_audio_accomodation"`
	HasVideoRecording    bool   `json:"has_video_recording"`
	IsOccupied           bool   `json:"is_occupied"`
}

type SearchRequestPayload struct {
	Seats                int    `json:"seats"`
	HasProjector         bool   `json:"has_projector"`
	HasWhiteboard        bool   `json:"has_whiteboard"`
	HasAudioAccomodation bool   `json:"has_audio_accomodation"`
	HasVideoRecording    bool   `json:"has_video_recording"`
	ReservationStart     string `json:"reservation_start"`
	Reservation_End      string `json:"reservation_end"`
	IsOccupied           bool   `json:"is_occupied"`
}

type ErrorResponse struct {
	Err string `json:"err"`
}
