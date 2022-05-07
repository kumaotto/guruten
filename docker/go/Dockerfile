FROM golang:1.16.3-alpine

WORKDIR /go/src/github.com/kumaotto/guruten

RUN apk --update add && apk --no-cache add git curl bash vim gcc

COPY go.mod /go/src/github.com/kumaotto/guruten/go.mod
COPY go.sum /go/src/github.com/kumaotto/guruten/go.sum
RUN go mod download

#GIN_MODE = release 
ENV GIN_MODE=debug
ENV GO111MODULE=on

# RUN go build
# RUN go install

COPY . .

CMD go run main.go
