IMAGE_NAME = lab
CONTAINER_NAME = lab-server

docker:
	docker build -t ${IMAGE_NAME} .
	# docker rm $(docker ps -a -q)
	# docker rmi $(docker images -q)
	docker run -d --name ${CONTAINER_NAME} -p 80:80 -p 443:443 -p 9001:9001 ${IMAGE_NAME}