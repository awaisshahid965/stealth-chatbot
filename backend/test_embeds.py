from dotenv import load_dotenv

from langchain_openai import ChatOpenAI
from langchain import hub
from langchain_core.output_parsers import StrOutputParser
from langchain_core.runnables import RunnablePassthrough
from langchain.chains import create_retrieval_chain
from langchain.chains.combine_documents import create_stuff_documents_chain

from app.vector_stores.qdrant_vector_store import QdrantVectoreStore

# loading env vars
load_dotenv()

qdrant_vector_store = QdrantVectoreStore(
    dataset_name="stealth"
)

# prompt = hub.pull("rlm/rag-prompt")
# qa_chain = (
#     {
#         "context": qdrant_vector_store.get_retriever(),
#         "question": RunnablePassthrough(),
#     }
#     | prompt
#     | StrOutputParser()
# )

model = ChatOpenAI(
    model='gpt-4o-mini',
    temperature=0,
)

retrieval_qa_chat_prompt = hub.pull("langchain-ai/retrieval-qa-chat")

combine_docs_chain = create_stuff_documents_chain(model, retrieval_qa_chat_prompt)
rag_chain = create_retrieval_chain(qdrant_vector_store.get_retriever(), combine_docs_chain)

def main():
    # response = rag_chain.invoke({ 'input': "What is stealth?" })
    # print(response)
    
    for chunk in rag_chain.stream({"input": "What is stealth?"}):
        if answer_chunk := chunk.get("answer"):
            print(f"{answer_chunk}", end="")



if __name__ == '__main__':
    main()
