import React, { useState, useEffect } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from '../components/BaseNode';
import { useStore } from '../store';

export const DelayNode = ({ id, data }) => {
  const updateNodeField = useStore((state) => state.updateNodeField);

  const [delay, setDelay] = useState(data?.delay || 1000);
  const [name, setName] = useState(data?.name || id.replace('delay-', 'delay_'));

  useEffect(() => {
    updateNodeField(id, 'delay', delay);
    updateNodeField(id, 'name', name);
  }, []);

  const handleDelayChange = (e) => {
    const newDelay = Number(e.target.value);
    setDelay(newDelay);
    updateNodeField(id, 'delay', newDelay);
  };

  const handleNameChange = (e) => {
    const newName = e.target.value;
    setName(newName);
    updateNodeField(id, 'name', newName);
  };

  return (
    <BaseNode
      id={id} 
      title="⏱️ Delay"
      inputs={[{ id: `${id}-input`, position: Position.Left }]}
      outputs={[{ id: `${id}-output`, position: Position.Right }]}
    >
      <div className="flex flex-col gap-2 text-xs">
        <label className="flex flex-col">
          Name:
          <input
            type="text"
            value={name}
            onChange={handleNameChange}
            placeholder="delay_name"
            className="border rounded px-1 py-0.5 text-sm"
          />
        </label>

        <label className="flex flex-col">
          Delay (ms):
          <input
            type="number"
            value={delay}
            onChange={handleDelayChange}
            className="border rounded px-1 py-0.5 text-sm"
          />
        </label>
      </div>
    </BaseNode>
  );
};
