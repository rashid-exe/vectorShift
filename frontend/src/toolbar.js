import { DraggableNode } from './draggableNode';

export const PipelineToolbar = () => {
  return (
    <div style={{ padding: '10px' }}>
      <div
        style={{
          marginTop: '20px',
          display: 'flex',
          flexWrap: 'wrap',
          gap: '10px',
        }}
      >
        {/* Existing Nodes */}
        <DraggableNode type="customInput" label="Input" />
        <DraggableNode type="llm" label="LLM" />
        <DraggableNode type="customOutput" label="Output" />
        <DraggableNode type="text" label="Text" />

        {/* New Custom Nodes */}
        <DraggableNode type="math" label="Math" />
        <DraggableNode type="condition" label="Condition" />
        <DraggableNode type="logger" label="Logger" />
        <DraggableNode type="api" label="API Call" />
        <DraggableNode type="delay" label="Delay" />
      </div>
    </div>
  );
};
