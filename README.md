# Welcome to Udacity Image-Processing API
This is an `express` webapp that accepts an image file name and  then shrinks it to the the dimensions specified using `Sharp` Library

To get this application run locally:

1. Clone this repository and `cd` into the application directory
2. Run `npm install --legacy-peer-deps` to install all the dependencies
3. Run `npm run build` to build the project
4. Run `npm start` to run the application which will be server by default on port 8000
5. Run `npm run test` to run the test cases

# Endpoints
| Method | Endpoint | Description | Response |
--- | --- | --- | --- | 
GET | /api/images?name=fjord&width=200&height=200 | Resizing image Endpoint | 200 OK
GET | /api/images?name=&width=&height= | Missing Params in query string | 400 Bad Request
GET | /api/images?name=fjord&width=p50&height=g400 | Invalid dimensions | 400 Bad Request
GET | /api/images?name=invalidName&width=200&height=200 | Name doesnt exist | 404 Not Found 

# Libraries
- [ExpressJS](https://github.com/expressjs/express) - Web app framework
- [Sharp](https://github.com/lovell/sharp) - Image resizing library
- [Morgan](https://github.com/expressjs/morgan) - Application Logging library
- [Jasmine](https://github.com/jasmine/jasmine-npm) - Behavior Driven Development library