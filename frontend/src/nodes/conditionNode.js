import React, { useState, useEffect } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from '../components/BaseNode';
import { useStore } from '../store';

export const ConditionNode = ({ id, data }) => {
  const updateNodeField = useStore((state) => state.updateNodeField);

  const [condName, setCondName] = useState(data?.name || id.replace('condition-', 'cond_'));

  useEffect(() => {
    updateNodeField(id, 'name', condName);
  }, []);

  const handleNameChange = (e) => {
    const newName = e.target.value;
    setCondName(newName);
    updateNodeField(id, 'name', newName);
  };

  return (
    <BaseNode
      id={id} 
      title="🔀 Condition"
      inputs={[{ id: `${id}-input`, position: Position.Left }]}
      outputs={[
        { id: `${id}-true`, position: Position.Right, style: { top: '30%' } },
        { id: `${id}-false`, position: Position.Right, style: { top: '70%' } },
      ]}
    >
      <div className="flex flex-col gap-2 text-xs">
        <label className="flex flex-col">
          Name:
          <input
            type="text"
            value={condName}
            onChange={handleNameChange}
            placeholder="cond_name"
            className="border rounded px-1 py-0.5 text-sm"
          />
        </label>

        <p className="text-gray-600 mt-1">
          If input is <strong>true</strong> → goes right top, else → right bottom
        </p>
      </div>
    </BaseNode>
  );
};
