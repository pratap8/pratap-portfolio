Whenever some edit is done in the project use below command

//for builing and sending to docker
docker build -t pratap-portfolio .

//To run the docker
docker run -d -p 3000:80 pratap-portfolio



Normal start in terminal command:
npm start

Docker command to run:
docker run -d -p 3000:80 pratap-portfolio

Note: You can direct run inside docker

URL:
http://localhost:3000/#projects