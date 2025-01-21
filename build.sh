#!/bin/bash

VERSION="1.0.0"

# Construir la imagen
docker build \
  --build-arg NEXT_PUBLIC_API_URL="http://144.217.242.126:3000" \
  -t marvinjoel2001/condaty-web:$VERSION \
  -t marvinjoel2001/condaty-web:latest \
  .

# Subir la imagen a Docker Hub
docker push marvinjoel2001/condaty-web:$VERSION
docker push marvinjoel2001/condaty-web:latest