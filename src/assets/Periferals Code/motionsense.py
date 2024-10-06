import RPi.GPIO as GPIO
import time
import requests

GPIO.setwarnings(False)
GPIO.setmode(GPIO.BCM)
GPIO.setup(17, GPIO.IN)


prev_state = 0

while (True):
    val = GPIO.input(17)
    if val == 1 and prev_state == 0:
        r = requests.post("http://129.153.169.171/api/activity?roomId=670122f3dca9a0c7fb02c603")
        print("Activity detected!")
        print("status code " + str(r.status_code))

    
    prev_state = val
    
    time.sleep(0.05)
    