# project-pi-service
this project was created by Muhammad Yousuf Ali, 18044950 for my final year project.
## description
This is the Raspberrypi server for my final year project, this service is running on the raspberry pi to change the GPIO pins via Https request for the web server and/or from a smartphone via Bluetooth.
## Environment setup
### Env Variables
| Env Variable | Description                                                     | Example               |   |   |
|--------------|-----------------------------------------------------------------|-----------------------|---|---|
| WS_ENDPOINT  | This needs to point to the web service end point of the project | http://localhost:3000 |   |   |
| FAN_PIN      | This is the GPIO pin that the fan is connected to.              | 6                     |   |   |
| LIGHT_PIN    | This is the GPIO pin that the light is connected to.            | 4                     |   |   |
