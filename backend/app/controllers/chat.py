from fastapi import APIRouter, Request
from fastapi.responses import StreamingResponse
from langchain.chains import create_retrieval_chain
from langchain_core.runnables import RunnablePassthrough
from langchain_openai import ChatOpenAI
from app.vector_stores.qdrant_vector_store import QdrantVectoreStore
from langchain import hub
from langchain.chains.combine_documents import create_stuff_documents_chain
from langchain_core.prompts import ChatPromptTemplate


from dotenv import load_dotenv

# Load environment variables
load_dotenv()

router = APIRouter()

qdrant_vector_store = QdrantVectoreStore(dataset_name="stealth")
model = ChatOpenAI(
    model='gpt-4o-mini',
    temperature=0,
)

retrieval_qa_chat_prompt = ChatPromptTemplate.from_messages([
  ("system", "Answer any user questions based solely on the context below. Format each of your responses in Markdown, and for each line break, use `<br>` at the end of the line. Ensure that all bullet points, sections, and paragraphs are properly separated with `<br>` for clearer formatting:\n<context>\n{context}\n</context>"),
  ("placeholder", "{chat_history}"),
  ("human", "{input}"),
])

combine_docs_chain = create_stuff_documents_chain(model, retrieval_qa_chat_prompt)

rag_chain = create_retrieval_chain(qdrant_vector_store.get_retriever(), combine_docs_chain)

async def answer_stream(query: str):
    for chunk in rag_chain.stream({"input": query}):
        if answer_chunk := chunk.get("answer"):
            yield f"{answer_chunk}\n"

@router.post("/query/")
async def query_endpoint(request: Request):
    body = await request.json()
    query = body.get("query")
    
    return StreamingResponse(answer_stream(query), media_type="text/plain")

