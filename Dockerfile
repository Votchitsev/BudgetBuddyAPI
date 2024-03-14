FROM oven/bun:1
WORKDIR /app
COPY package*.json /app
RUN bun install
COPY . /app
RUN chmod +x run.sh
