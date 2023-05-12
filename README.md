# project-pi-service
this project was created by Muhammad Yousuf Ali, 18044950 for my final year project.
## description
This is the Raspberrypi server for my final year project, this service is running on the raspberry pi to change the GPIO pins via Https request for the web server and/or from a smartphone via Bluetooth.
## Environment setup
### Env Variables
\begin{table}[]
\begin{tabular}{lllll}
Env Variable & Description                                                     & Example               &  &  \\
WS\_ENDPOINT & This needs to point to the web service end point of the project & http://localhost:3000 &  &  \\
FAN\_PIN     & This is the GPIO pin that the fan is connected to.              & 6                     &  &  \\
LIGHT\_PIN   & This is the GPIO pin that the light is connected to.            & 4                     &  & 
\end{tabular}
\end{table}
