# terrascope

Terrascope programming assignment

# Setting up project

To Install Dependencies: <br/>
Run "npm install" <br/><br/>

To start the application: <br/>
Run "npm run start" <br/>
The program will be accessible on http://localhost:4000<br/><br/>

To run the unit tests: <br/>
Run "npm run test"<br/><br/>


# Endpoints
POST '/images' <br/>
send image as form body with "uploaded_file" as key.<br/><br/>

GET '/images/:id'<br/>
To get the image, send the image id in ':id'<br/>
To get image in a different format, add query '?type=<png|jpeg|jpg|png>'<br/><br/>