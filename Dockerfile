# Multi-stage production Dockerfile for AlertNex
# Ministry of Development of North Eastern Region (MDoNER) - SIH 2026
FROM python:3.12-slim

WORKDIR /app

# Install system dependencies & build tools
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    libpq-dev \
    curl \
    && rm -rf /var/lib/apt/lists/*

# Install Python requirements
COPY backend/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy backend codebase and static frontend assets
COPY backend/ /app/backend/
COPY alertnex-app/ /app/alertnex-app/

# Environment defaults
ENV PYTHONUNBUFFERED=1
ENV UPLOAD_DIR=/app/backend/uploads
ENV DATABASE_URL=sqlite:///./alertnex.db
ENV PROTOTYPE_MODE=true

EXPOSE 8000

# Health check
HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:8000/health || exit 1

# Launch ASGI Server
CMD ["uvicorn", "backend.main:app", "--host", "0.0.0.0", "--port", "8000"]
