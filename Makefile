DOCKER_IMAGE_LOCAL=freis_frensi
DOCKER_IMAGE_ECR=401913772240.dkr.ecr.us-west-2.amazonaws.com/freis_frensi

docker-build:
	docker build -t $(DOCKER_IMAGE_LOCAL):latest .

docker-run:
	docker run -it --rm -p 8080:8080 $(DOCKER_IMAGE_LOCAL):latest

ecr-deploy:
	make docker-build
	aws ecr get-login-password --region us-west-2 | docker login --username AWS --password-stdin 401913772240.dkr.ecr.us-west-2.amazonaws.com
	docker tag $(DOCKER_IMAGE_LOCAL):latest $(DOCKER_IMAGE_ECR):latest
	docker push $(DOCKER_IMAGE_ECR):latest

