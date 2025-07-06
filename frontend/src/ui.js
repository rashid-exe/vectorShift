import { useState, useRef, useCallback, useEffect } from 'react';
import ReactFlow, {
  Controls,
  Background,
  MiniMap,
  useOnSelectionChange,
} from 'reactflow';
import { useStore } from './store';
import { shallow } from 'zustand/shallow';

import { InputNode } from './nodes/inputNode';
import { LLMNode } from './nodes/llmNode';
import { OutputNode } from './nodes/outputNode';
import { TextNode } from './nodes/textNode';
import { MathNode } from './nodes/mathNode';
import { ConditionNode } from './nodes/conditionNode';
import { LoggerNode } from './nodes/loggerNode';
import { APICallNode } from './nodes/APICallNode';
import { DelayNode } from './nodes/delayNode';

import 'reactflow/dist/style.css';

const gridSize = 20;
const proOptions = { hideAttribution: true };

const nodeTypes = {
  customInput: InputNode,
  llm: LLMNode,
  customOutput: OutputNode,
  text: TextNode,
  math: MathNode,
  condition: ConditionNode,
  logger: LoggerNode,
  api: APICallNode,
  delay: DelayNode,
};

const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
  getNodeID: state.getNodeID,
  addNode: state.addNode,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  onConnect: state.onConnect,
  removeEdge: state.removeEdge,
});

export const PipelineUI = () => {
  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [selectedEdge, setSelectedEdge] = useState(null);
  const [edgeCenter, setEdgeCenter] = useState(null);

  const {
    nodes,
    edges,
    getNodeID,
    addNode,
    onNodesChange,
    onEdgesChange,
    onConnect,
    removeEdge,
  } = useStore(selector, shallow);

  const getInitNodeData = (nodeID, type) => ({
    id: nodeID,
    nodeType: type,
  });

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();
      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      const appDataRaw = event?.dataTransfer?.getData('application/reactflow');
      if (appDataRaw) {
        const appData = JSON.parse(appDataRaw);
        const type = appData?.nodeType;
        if (!type) return;

        const position = reactFlowInstance.project({
          x: event.clientX - reactFlowBounds.left,
          y: event.clientY - reactFlowBounds.top,
        });

        const nodeID = getNodeID(type);
        const newNode = {
          id: nodeID,
          type,
          position,
          data: getInitNodeData(nodeID, type),
        };

        addNode(newNode);
      }
    },
    [reactFlowInstance]
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  // I am here trackingg selected edge
  useOnSelectionChange({
    onChange: ({ edges: selectedEdges }) => {
      if (selectedEdges.length > 0) {
        setSelectedEdge(selectedEdges[0]);
        
        const edge = selectedEdges[0];
        const source = nodes.find((n) => n.id === edge.source);
        const target = nodes.find((n) => n.id === edge.target);
        if (source && target) {
          const x = (source.position.x + target.position.x) / 2;
          const y = (source.position.y + target.position.y) / 2;
          setEdgeCenter({ x, y });
        }
      } else {
        setSelectedEdge(null);
        setEdgeCenter(null);
      }
    },
  });

  //  For edge deletion
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.key === 'Delete' || e.key === 'Backspace') && selectedEdge) {
        removeEdge(selectedEdge.id);
        setSelectedEdge(null);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [selectedEdge]);

  return (
    <div
      className="w-full h-[80vh] bg-gray-100 border-t border-gray-300 rounded-b-lg shadow-inner relative"
      ref={reactFlowWrapper}
    >
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onDrop={onDrop}
        onDragOver={onDragOver}
        onInit={setReactFlowInstance}
        nodeTypes={nodeTypes}
        proOptions={proOptions}
        snapGrid={[gridSize, gridSize]}
        connectionLineStyle={{ stroke: '#4F46E5', strokeWidth: 2 }}
        connectionLineType="smoothstep"
        fitView
      >
        <Background color="#E5E7EB" gap={gridSize} />
        <Controls position="top-right" className="bg-white shadow-md rounded-md" />
        <MiniMap
          className="rounded-md shadow"
          nodeColor={(node) => {
            switch (node.type) {
              case 'llm':
                return '#6366F1';
              case 'customInput':
                return '#10B981';
              case 'customOutput':
                return '#EF4444';
              case 'text':
                return '#F59E0B';
              default:
                return '#6B7280';
            }
          }}
        />
      </ReactFlow>

      
      {selectedEdge && edgeCenter && (
        <button
          className="absolute z-50 bg-white border border-gray-300 text-red-500 rounded-full p-1 shadow-md hover:bg-red-100"
          style={{
            left: edgeCenter.x,
            top: edgeCenter.y,
            transform: 'translate(-50%, -50%)',
          }}
          onClick={() => {
            removeEdge(selectedEdge.id);
            setSelectedEdge(null);
          }}
        >
          🗑️
        </button>
      )}
    </div>
  );
};
