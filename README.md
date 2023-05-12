# project-pi-service
this project was created by Muhammad Yousuf Ali, 18044950 for my final year project.

## description
This is the Raspberrypi server for my final year project, this service is running on the raspberry pi to change the GPIO pins via Https request for the web server and/or from a smartphone via Bluetooth.

## Environment setup

### Env Variables

| Env Variable | Description                                                     | Example               |
|--------------|-----------------------------------------------------------------|-----------------------|
| WS_ENDPOINT  | This needs to point to the web service end point of the project | http://localhost:3000 |
| FAN_PIN      | This is the GPIO pin that the fan is connected to.              | 6                     |
| LIGHT_PIN    | This is the GPIO pin that the light is connected to.            | 4                     | 

### Raspberrypi setup

-   Needs Bluetooth development packages to build

`apt-get install build-essential libbluetooth-dev`

### Note on RFCOMM Server Sockets

As the initial implementation of the RFCOMM server sockets is based on BlueZ4, in order to work with SDP we need to change the bluetooth service configuration file by modifing the systemd unit file: bluetooth.service:

(Debian based distro)

`sudo vim /lib/systemd/system/bluetooth.service`

(RedHat based distro)

`sudo vim /usr/lib/systemd/system/bluetooth.service`

and adding the --compat flag to the ExecStart value:

`ExecStart=/usr/lib/bluetooth/bluetoothd `**`--compat`**

Finally, restart the service:

```bash
sudo systemctl daemon-reload
sudo systemctl restart bluetooth
```
