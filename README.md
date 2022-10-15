# Udacity-Image-Processing
## Scripts needed
 - `npm install` to install all the required dependencies
 - `npm run build` to build the project
 - `npm run start ` to start the server
 - `npm run test` to run the test
 - `npm run format` to run lint and prettify
 
 ## Endpoints available
 ### Get and resize images
- `http://localhost:3000/images`
#### Query paramter
- Required: `filename` available filenames are:
    - cat
    - cat2
    - image
    - image2

- Optional: `width` 
- Optional: `height`

Examples:  
1- Request: `http://localhost:3000/images`  
Excpeted behaviour: Eror will be returned "parameter not sent"  
2- Request: `http://localhost:3000/images?filename=cat`  
Excpeted behaviour: Orignal image will be returned  
3- Request: `http://localhost:3000/images?filename=cat&width=100&height=120`  
Excpeted behaviour: Image will be resized and saved at the disk  
4- Request: `http://localhost:3000/images?filename=cat&width=100&height=120`  
Excpeted behaviour: Image will be returned from cache  
5- Request: `http://localhost:3000/images?filename=cat&width=gfgg&height=fheh`  
Excpeted behaviour: Eror will be returned "Only numbers are allowed"  
6- Request: `http://localhost:3000/images?filename=cat&width=100`  
Excpeted behaviour: Eror will be returned "width and height both must send"  
7- Request: `http://localhost:3000/images?filename=dog&width=100&height=150`  
Excpeted behaviour: Eror will be returned "image not found"





