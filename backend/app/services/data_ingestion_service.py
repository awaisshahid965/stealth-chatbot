import os
from typing import List

from langchain.document_loaders import PyPDFLoader
from langchain.text_splitter import TextSplitter
from langchain.schema import Document

from app.vector_stores.base import VectorStoreBase

class DataIngestionService:
    
    def __init__(
        self,
        datastore: VectorStoreBase,
        text_splitter: TextSplitter
    ):
        self.datastore = datastore
        self.text_splitter = text_splitter

    def add_pdf(self, pdf_file_path: str):
        if not os.path.exists(pdf_file_path):
            raise FileNotFoundError(f"PDF file not found: {pdf_file_path}")
        
        try:
            loader = PyPDFLoader(pdf_file_path)
            pages = loader.load()
            
            self._add_documents(pages)
        except Exception as e:
            raise ValueError(f"Error processing PDF file: {e}")

    def add_txt(self, txt_file_path: str):
        self._add_file(txt_file_path, file_type="TXT")

    def add_md(self, md_file_path: str):
        self._add_file(md_file_path, file_type="Markdown")
    
    def _add_file(self, file_path: str, file_type: str = "TXT"):
        if not os.path.exists(file_path):
            raise FileNotFoundError(f"{file_type} file not found: {file_path}")
        
        try:
            with open(file_path, 'r', encoding='utf-8') as file:
                text = file.read()
            
            documents = [Document(page_content=text)]
            self._add_documents(documents)
        except Exception as e:
            raise ValueError(f"Error processing {file_type} file: {e}")
    
    def _add_documents(self, documents: List[Document]):
        if not documents or not isinstance(documents, list):
            raise ValueError("Invalid documents format. Expected a non-empty list.")

        try:
            split_docs = self.text_splitter.split_documents(documents)
            self.datastore.add_docs(split_docs)
        except Exception as e:
            raise ValueError(f"Error splitting or adding documents: {e}")
