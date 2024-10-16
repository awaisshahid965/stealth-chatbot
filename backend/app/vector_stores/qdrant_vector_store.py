import os
from typing import List

from langchain_openai import OpenAIEmbeddings
from langchain_qdrant import QdrantVectorStore as QdrantVectorStoreMain
from langchain.schema import Document

from qdrant_client import QdrantClient
from qdrant_client.models import Distance, VectorParams

from .base import VectorStoreBase

class QdrantVectoreStore(VectorStoreBase):

    def __init__(self, dataset_name):

        dataset_base_url = os.getenv('QDRANT_CLUSTER_URL')
        dataset_api_key = os.getenv('QDRANT_API_KEY')

        if not dataset_base_url:
            raise ValueError("Unable to get qdrant dataset base path!")

        if not dataset_api_key:
            raise ValueError("Unable to get qdrant dataset api key!")

        if not dataset_name:
            raise ValueError("A valid dataset name is required!")

        client = QdrantClient(
            url=dataset_base_url,
            api_key=dataset_api_key,
        )
        
        if not client.collection_exists(collection_name=dataset_name):
            client.create_collection(
                collection_name=dataset_name,
                vectors_config=VectorParams(
                    size=1536,
                    distance=Distance.COSINE,
                )
            )

        self.db = QdrantVectorStoreMain(
            collection_name=dataset_name,
            client=client,
            embedding=OpenAIEmbeddings(
                model='text-embedding-3-small',
            )
        )
    
    def get_retriever(self):
        return self.db.as_retriever()

    def add_docs(self, docs: List[Document]):
        self.db.add_documents(docs)
