#!/bin/bash

# https://github.com/bootprint/bootprint-openapi
rm -rf ./build/docs
bootprint openapi ./docs/v1.swagger.yaml ./build/docs/v1
bootprint openapi ./docs/ac.swagger.yaml ./build/docs/ac
