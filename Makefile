.RECIPEPREFIX := >

.DEFAULT_GOAL := build

VERSION := $(shell cat package.json | jq .version)

.PHONY: build push clean lint

build:
> @docker build \
> --tag=adamelliotfields/landing-page:latest \
> --tag=adamelliotfields/landing-page:${VERSION} \
> .

push:
> @docker push adamelliotfields/landing-page

clean:
> @docker image rm -f $(shell docker images adamelliotfields/landing-page -q)

lint:
> @hadolint Dockerfile
