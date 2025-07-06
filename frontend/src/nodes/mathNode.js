import React, { useState, useEffect } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from '../components/BaseNode';
import { useStore } from '../store';

export const MathNode = ({ id, data }) => {
  const updateNodeField = useStore((state) => state.updateNodeField);
  const [name, setName] = useState(data?.name || id.replace('math-', 'math_'));

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
      title="➕ Math Node"
      inputs={[
        { id: `${id}-a`, position: Position.Left, style: { top: '30%' } },
        { id: `${id}-b`, position: Position.Left, style: { top: '70%' } },
      ]}
      outputs={[{ id: `${id}-sum`, position: Position.Right }]}
    >
      <div className="text-xs flex flex-col gap-2 text-gray-700">
        <label className="flex flex-col">
          Name:
          <input
            type="text"
            value={name}
            onChange={handleNameChange}
            placeholder="math_name"
            className="border rounded px-1 py-0.5 text-sm"
          />
        </label>
        <p>Adds A + B and exposes the sum.</p>
      </div>
    </BaseNode>
  );
};
