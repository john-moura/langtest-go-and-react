# Build stage
FROM golang:1.24.4-alpine AS builder

WORKDIR /app

# Install build dependencies
RUN apk add --no-cache git

# Copy go.mod and go.sum and download dependencies
COPY go.mod go.sum ./
RUN go mod download

# Copy the rest of the application
COPY . .

# Build the application
RUN CGO_ENABLED=0 GOOS=linux go build -o /langtest ./cmd/main.go

# Run stage
FROM alpine:latest

WORKDIR /

# Copy the binary from the builder stage
COPY --from=builder /langtest /langtest
# Copy B1_Tests_JSON_All if needed at runtime
COPY --from=builder /app/B1_Tests_JSON_All ./B1_Tests_JSON_All

EXPOSE 8080

ENTRYPOINT ["/langtest"]