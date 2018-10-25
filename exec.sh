#!/usr/bin/env bash
docker build -t catch-ex .
docker run -p 3000:3000 -it catch-ex