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
