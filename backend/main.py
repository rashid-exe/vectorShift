from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Dict

app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Node(BaseModel):
    id: str

class Edge(BaseModel):
    source: str
    target: str

class PipelineData(BaseModel):
    nodes: List[Node]
    edges: List[Edge]

@app.post("/pipelines/parse")
async def parse_pipeline(data: PipelineData):
    num_nodes = len(data.nodes)
    num_edges = len(data.edges)

   
    graph = {node.id: [] for node in data.nodes}
    for edge in data.edges:
        graph[edge.source].append(edge.target)

   
    def is_cyclic(v, visited, rec_stack):
        visited.add(v)
        rec_stack.add(v)
        for neighbor in graph.get(v, []):
            if neighbor not in visited:
                if is_cyclic(neighbor, visited, rec_stack):
                    return True
            elif neighbor in rec_stack:
                return True
        rec_stack.remove(v)
        return False

    visited = set()
    is_dag = True
    for node in graph:
        if node not in visited:
            if is_cyclic(node, visited, set()):
                is_dag = False
                break

    return {
        "num_nodes": num_nodes,
        "num_edges": num_edges,
        "is_dag": is_dag
    }
