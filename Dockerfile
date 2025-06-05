# Stage 1: Build React App
FROM node:20 AS frontend-build
# Document the required build argument
ARG FRONTEND_ENV
ENV FRONTEND_ENV=${FRONTEND_ENV}
WORKDIR /app
COPY frontend/ /app/
<<<<<<< HEAD
# Handle .env file creation more gracefully
RUN if [ -f .env ]; then rm .env; fi && \
    touch .env && \
    if [ ! -z "${FRONTEND_ENV}" ]; then \
        echo "${FRONTEND_ENV}" | tr ',' '\n' > .env; \
    fi
=======
RUN rm -f /app/.env
RUN touch /app/.env
RUN echo "${FRONTEND_ENV}" | tr ',' '\n' > /app/.env
RUN cat /app/.env
>>>>>>> 5cf87cb6430f90c5cd0168fb2bc75f20a4a21f03
RUN yarn install --frozen-lockfile && yarn build

# Stage 2: Install Python Backend
FROM python:3.11-slim as backend
WORKDIR /app
<<<<<<< HEAD
COPY backend/ /app/
# Handle .env file creation more gracefully
RUN if [ -f .env ]; then rm .env; fi && \
    touch .env
=======
# Copy requirements first for better caching
COPY requirements.txt /app/
>>>>>>> 5cf87cb6430f90c5cd0168fb2bc75f20a4a21f03
RUN pip install --no-cache-dir -r requirements.txt
COPY backend/ /app/
RUN rm -f /app/.env

# Stage 3: Final Image
FROM nginx:stable-alpine
# Copy built frontend
COPY --from=frontend-build /app/build /usr/share/nginx/html
# Copy backend
COPY --from=backend /app /backend
# Copy nginx config
COPY nginx.conf /etc/nginx/nginx.conf
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

# Install Python and dependencies
<<<<<<< HEAD
RUN apk add --no-cache python3 py3-pip && \
    pip3 install -r /backend/requirements.txt
=======
RUN apk add --no-cache python3 py3-pip \
    && pip3 install --no-cache-dir -r /backend/requirements.txt
>>>>>>> 5cf87cb6430f90c5cd0168fb2bc75f20a4a21f03

# Add env variables if needed
ENV PYTHONUNBUFFERED=1

# Start both services: Uvicorn and Nginx
CMD ["/entrypoint.sh"]
