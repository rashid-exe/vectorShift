import { Handle, Position } from 'reactflow';

export const BaseNode = ({
  id,
  title,
  children,
  inputs = [],
  outputs = [],
}) => {
  return (
    <div className="bg-white border border-gray-300 rounded-xl shadow-md p-4 w-[260px] text-sm font-sans relative">
      {/* Title */}
      <div className="text-base font-semibold mb-3 text-gray-800">{title}</div>

      {/* Input Handles */}
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

      {/* Node Content */}
      <div className="flex flex-col gap-3">{children}</div>

      {/* Output Handles */}
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

