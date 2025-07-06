import React, { useState, useEffect } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from '../components/BaseNode';
import { useStore } from '../store';

export const LLMNode = ({ id, data }) => {
  const updateNodeField = useStore((state) => state.updateNodeField);

  const [name, setName] = useState(data?.name || id.replace('llm-', 'llm_'));

  useEffect(() => {
    updateNodeField(id, 'name', name);
  }, []);

  const handleNameChange = (e) => {
    const newName = e.target.value;
    setName(newName);
    updateNodeField(id, 'name', newName);
  };

  return (
    <BaseNode
      id={id} 
      title="🤖 LLM"
      inputs={[
        { id: `${id}-system`, position: Position.Left, style: { top: `${100 / 3}%` } },
        { id: `${id}-prompt`, position: Position.Left, style: { top: `${200 / 3}%` } },
      ]}
      outputs={[
        { id: `${id}-response`, position: Position.Right },
      ]}
    >
      <div className="text-xs flex flex-col gap-2 text-gray-700">
        <label className="flex flex-col">
          Name:
          <input
            type="text"
            value={name}
            onChange={handleNameChange}
            placeholder="llm_name"
            className="border rounded px-1 py-0.5 text-sm"
          />
        </label>
        <p>This is an LLM node that accepts system and prompt inputs.</p>
      </div>
    </BaseNode>
  );
};
