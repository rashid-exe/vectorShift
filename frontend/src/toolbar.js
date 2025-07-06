// import { DraggableNode } from './draggableNode';

// export const PipelineToolbar = () => {
//   return (
//     <div style={{ padding: '10px' }} className='flex justify-evenly items-center'>
//       <div
//         style={{
//           marginTop: '20px',
//           display: 'flex',
//           flexWrap: 'wrap',
//           gap: '10px',
//         }}
//       >
//         {/* Existing Nodes */}
//         <DraggableNode type="customInput" label="Input" />
//         <DraggableNode type="llm" label="LLM" />
//         <DraggableNode type="customOutput" label="Output" />
//         <DraggableNode type="text" label="Text" />

//         {/* New Custom Nodes */}
//         <DraggableNode type="math" label="Math" />
//         <DraggableNode type="condition" label="Condition" />
//         <DraggableNode type="logger" label="Logger" />
//         <DraggableNode type="api" label="API Call" />
//         <DraggableNode type="delay" label="Delay" />
//       </div>
//     </div>
//   );
// };

import { DraggableNode } from './draggableNode';

const nodes = [
  { type: 'customInput', label: 'Input', icon: '📝' },
  { type: 'llm', label: 'LLM', icon: '🤖' },
  { type: 'customOutput', label: 'Output', icon: '📤' },
  { type: 'text', label: 'Text', icon: '🧾' },
  { type: 'math', label: 'Math', icon: '➗' },
  { type: 'condition', label: 'Condition', icon: '🔀' },
  { type: 'logger', label: 'Logger', icon: '📋' },
  { type: 'api', label: 'API Call', icon: '🌐' },
  { type: 'delay', label: 'Delay', icon: '⏱️' },
];

export const PipelineToolbar = () => {
  return (
    <div className="w-full bg-gray-100 border-b border-gray-200 py-4 shadow-sm">
      <div className="flex flex-wrap justify-center gap-4 px-4">
        {nodes.map((node) => (
          <DraggableNode
            key={node.type}
            type={node.type}
            label={`${node.icon} ${node.label}`}
          />
        ))}
      </div>
    </div>
  );
};
