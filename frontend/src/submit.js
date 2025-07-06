import { useStore } from './store';

export const SubmitButton = () => {
  const { nodes, edges } = useStore((state) => ({
    nodes: state.nodes,
    edges: state.edges,
  }));

  const handleSubmit = async () => {
    try {
      const res = await fetch('http://127.0.0.1:8000/pipelines/parse', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nodes, edges }),
      });

      const result = await res.json();

      alert(`✅ Result:
- Nodes: ${result.num_nodes}
- Edges: ${result.num_edges}
- Is DAG: ${result.is_dag ? '✅ Yes' : '❌ No'}
`);
    } catch (error) {
      alert('Error submitting graph: ' + error.message);
    }
  };

  return (
   <div className="w-full flex justify-center mt-6">
     <button
      className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-1 rounded-lg shadow-md transition"
      onClick={handleSubmit}
    >
      Submit Graph
    </button>
   </div>
  );
};
