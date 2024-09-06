FROM node:alpine

WORKDIR /usr/src/app

COPY . /usr/src/app

COPY ./package.json /usr/src/app
RUN npm install -g @angular/cli

RUN npm install

# descomentar pra testes

# RUN apk add --no-cache \
#     chromium \
#     udev \
#     font-noto \
#     ttf-freefont \
#     && npm install -g karma-cli

# ENV CHROME_BIN=/usr/bin/chromium-browser
# ENV CHROME_PATH=/usr/bin/chromium-browser

# RUN ng test --watch=false --browsers=ChromeHeadlessNoSandbox    



RUN ng test --watch=false --browsers=ChromeHeadless --no-sandbox

CMD ["ng", "serve", "--host", "0.0.0.0"]
