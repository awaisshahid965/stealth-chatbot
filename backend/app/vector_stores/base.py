from abc import ABC, abstractmethod
from typing import List

from langchain.schema import Document

class VectorStoreBase(ABC):
    
    @abstractmethod
    def add_docs(self, docs: List[Document]):
        """Method to add documents to the datastore."""
        pass

    @abstractmethod
    def get_retriever(self):
        """Method to return a retriever for embeddings."""
        pass
