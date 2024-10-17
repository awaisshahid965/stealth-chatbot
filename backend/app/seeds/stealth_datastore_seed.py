import logging
import os
import sys
from pathlib import Path
from dotenv import load_dotenv

from langchain.text_splitter import RecursiveCharacterTextSplitter

from backend.app.services.data_ingestion_service import DataIngestionService
from app.vector_stores.qdrant_vector_store import QdrantVectoreStore
from app.utils.file_utils import get_files_in_directory

SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
sys.path.append(os.path.dirname(SCRIPT_DIR))

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')

# loading env vars
load_dotenv()

datastore = QdrantVectoreStore(dataset_name="stealth")
recursive_text_splitter = RecursiveCharacterTextSplitter(
    chunk_size=500,
    chunk_overlap=10,
    length_function=len,
)
data_ingestion_service = DataIngestionService(
    datastore=datastore,
    text_splitter=recursive_text_splitter,
)
data_directory = os.path.join(SCRIPT_DIR, "..", "data")

supported_extensions = [".pdf", ".md"]
all_files = get_files_in_directory(data_directory, supported_extensions)

ingestion_callbacks = {
    '.pdf': data_ingestion_service.add_pdf,
    '.md': data_ingestion_service.add_md,
}


def run_seed():

    if not all_files:
        logging.warning(f"No files of format {', '.join(supported_extensions)} found in given directory, aborting...")

    # Process each file based on its type
    for file_path in all_files:
        extension = Path(file_path).suffix.lower()

        try:
            if extension in ingestion_callbacks:
                logging.info(f"Processing {extension.upper()} file: {file_path}")
                print(f"Processing {extension.upper()} file: {file_path}")
                ingestion_callbacks[extension](file_path)
            else:
                logging.warning(f"Skipping unsupported file type: {file_path}")
                print(f"Skipping unsupported file type: {file_path}")
        except Exception as e:
            logging.error(f"Error processing file {file_path}: {e}")
            print(f"Error processing file {file_path}: {e}")

if __name__ == '__main__':
    run_seed()
