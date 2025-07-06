import { Handle, Position } from 'reactflow';
import { useStore } from '../store';

export const BaseNode = ({
  id,
  title,
  children,
  inputs = [],
  outputs = [],
}) => {
  const removeNode = useStore((state) => state.removeNode);

  const handleDelete = (e) => {
    e.stopPropagation(); 
    console.log("Deleting node:", id);
    removeNode(id);
  };

  return (
    <div className="bg-white border border-gray-300 rounded-xl shadow-md p-4 w-[260px] text-sm font-sans relative z-[100]">
      
      <button
        onClick={handleDelete}
        className="absolute top-1.5 right-1.5 text-gray-500 hover:text-red-600 hover:bg-gray-100 rounded-full p-1 z-50"
        title="Delete node"
      >
        &times;
      </button>

      
      <div className="text-base font-semibold mb-3 text-gray-800">{title}</div>

      
      {inputs.map((input) => (
        <Handle
          key={`input-${input.id}`}
          id={input.id}
          type="target"
          position={input.position || Position.Left}
          isConnectable={true}
          style={{
            ...input.style,
            background: '#3B82F6',
            position: 'absolute',
            width: 10,
            height: 10,
            borderRadius: '50%',
            border: '1px solid white',
          }}
        />
      ))}

      
      <div className="flex flex-col gap-3">{children}</div>

      
      {outputs.map((output) => (
        <Handle
          key={`output-${output.id}`}
          id={output.id}
          type="source"
          position={output.position || Position.Right}
          isConnectable={true}
          style={{
            ...output.style,
            background: '#10B981',
            position: 'absolute',
            width: 10,
            height: 10,
            borderRadius: '50%',
            border: '1px solid white',
          }}
        />
      ))}
    </div>
  );
};
