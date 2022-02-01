#!/bin/bash

# add plugins
yarn strapi install documentation

# rebuild the ui
yarn build --clean

# run the server
yarn develop
