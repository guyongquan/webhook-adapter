FROM node:alpine
ADD package.json /app/dockerbase/
RUN cd /app/dockerbase && npm install --only=prod -g --registry=https://registry.npm.taobao.org && ln -s /app/dockerbase/node_modules /app/node_modules

