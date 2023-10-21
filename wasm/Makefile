GO := "$(HOME)"/go/go1.21.0/bin/go

build:
	GO111MODULE=auto GOOS=js GOARCH=wasm $(GO) build -o main.wasm ./main.go

.PHONY: build