package main

type Room struct {
	Id                int
	Available         bool
	Seats             int
	WhiteBoard        bool
	AudioAccomodation bool
	VideoRecording    bool
	OccupiedNow       bool
}
