import React, { useEffect, useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from '../components/BaseNode';
import { useStore } from '../store';

export const LoggerNode = ({ id, data }) => {
  const updateNodeField = useStore((state) => state.updateNodeField);

  const [name, setName] = useState(data?.name || id.replace('logger-', 'logger_'));

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
      title="📋 Logger"
      inputs={[{ id: `${id}-log`, position: Position.Left }]}
      outputs={[]}
    >
      <div className="text-xs flex flex-col gap-2 text-gray-700">
        <label className="flex flex-col">
          Name:
          <input
            type="text"
            value={name}
            onChange={handleNameChange}
            placeholder="logger_name"
            className="border rounded px-1 py-0.5 text-sm"
          />
        </label>
        <p>Logs incoming data to console.</p>
      </div>
    </BaseNode>
  );
};
