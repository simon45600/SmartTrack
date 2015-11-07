FROM node:0.12
RUN \
  apt-get update && \
  apt-get install git && \
  git clone https://github.com/simon45600/SmartTrackV2.git && \
  cd SmartTrackV2 && \
  npm install && \
  node app.js
#CMD npm install
#CMD node app.js
