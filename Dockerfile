# Start from the Python 3.9 slim image
FROM python:3.9-slim

# Copy the requirements file to the Docker image 
COPY requirements.txt requirements.txt

# Update the packages list and install necessary packages for PostgreSQL
RUN apt-get update && apt-get install -y libpq-dev gcc

# Install the Python dependencies
RUN pip install -r requirements.txt --no-cache-dir

# Copy the contents of the app directory to the Docker image
COPY app/ /app

# Change the working directory
WORKDIR /app

# Expose the port the app runs on
EXPOSE 8080

# Start the application
CMD ["python", "app.py"]