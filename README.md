This program can execute on Docker or Host which setup node enviroment

On bin/parkinglot folder, you run the command below to execute it

# Access folder source

cd bin/parkinglot

# Build docker image from source

docker build -t parkinglot .

# Run container from docker image

docker run -it -d parkinglot

# Check container which run source code

docker ps -a

Ex:

CONTAINER ID        IMAGE               COMMAND                  CREA                  PORTS               NAMES
b74e4feab97f        parkinglot          "docker-entrypoint.s…"   10 minutes ago                          thirsty_gates

# Check log execute program

docker logs CONTAINERID

Ex: docker logs b74e4feab97f

## Output:

Created parking lot with 6 slots
Allocated slot number: 1
Allocated slot number: 2
Allocated slot number: 3
Allocated slot number: 4
Allocated slot number: 5
Allocated slot number: 6
Registration number KA-01-HH-3141 with Slot Number 6 is free with Charge 30
Slot No. Registration No. 
1 KA-01-HH-1234 
2 KA-01-HH-9999 
3 KA-01-BB-0001 
4 KA-01-HH-7777 
5 KA-01-HH-2701 
Allocated slot number: 6
Sorry, parking slot is full
Registration number KA-01-HH-1234 with Slot Number 1 is free with Charge 30
Registration number KA-01-BB-0001 with Slot Number 3 is free with Charge 50
Registration number DL-12-AA-9999 not found
Allocated slot number: 1
Allocated slot number: 3
Sorry, parking slot is full
Slot No. Registration No. 
1 KA-09-HH-0987 
2 KA-01-HH-9999 
3 CA-09-IO-1111 
4 KA-01-HH-7777 
5 KA-01-HH-2701 
6 KA-01-P-333 