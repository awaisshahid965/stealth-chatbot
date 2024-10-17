## Overview

This is a FastAPI application that interacts with OpenAI and Qdrant. Follow the steps below to set up and run the application.

## Prerequisites

- Python 3.10
- pip
- Virtual environment (recommended)

## Setup

1. **Extract Zip**

2. **Create a Virtual Environment**

   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows use `venv\Scripts\activate`
   ```

3. **Install Dependencies**

   ```bash
   pip install -r requirements.txt
   ```

4. **Set Up Environment Variables**

   Create a file named `.env` in the root directory of your project and add the following environment variables:

   ```env
   OPENAI_API_KEY=your_openai_api_key
   QDRANT_API_KEY=your_qdrant_api_key
   QDRANT_CLUSTER_URL=your_qdrant_cluster_url
   ```

   Make sure to replace the placeholder values with your actual API keys and URLs.

## Running the Application

To run the application in development mode with automatic reloading, use:

```bash
uvicorn app.main:app --reload
```

If you prefer to run the application without reloading (for production or testing), use:

```bash
uvicorn app.main:app
```

## Accessing the Application

Once the server is running, you can access the application at:

```
http://localhost:8000
```

## Acknowledgments

- OpenAI for the API
- Qdrant for the vector search engine
```
