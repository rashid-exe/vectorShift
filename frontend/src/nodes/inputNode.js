import React, { useState, useEffect } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from '../components/BaseNode';
import { useStore } from '../store';

export const InputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(data?.inputName || id.replace('customInput-', 'input_'));
  const [inputType, setInputType] = useState(data?.inputType || 'Text');
  const updateNodeField = useStore((state) => state.updateNodeField);

  const handleNameChange = (e) => {
    const newName = e.target.value;
    setCurrName(newName);
    updateNodeField(id, 'name', newName); 
    updateNodeField(id, 'inputName', newName); 
  };

  const handleTypeChange = (e) => {
    const newType = e.target.value;
    setInputType(newType);
    updateNodeField(id, 'inputType', newType);
  };

  
  useEffect(() => {
    updateNodeField(id, 'name', currName);
    updateNodeField(id, 'inputName', currName);
    updateNodeField(id, 'inputType', inputType);
  }, []);

  return (
    <BaseNode
      id={id} 
      title="📥 Input"
      inputs={[]} 
      outputs={[{ id: `${id}-value`, position: Position.Right }]}
    >
      <div className="flex flex-col gap-2">
        <label className="flex flex-col text-sm">
          Name:
          <input
            type="text"
            value={currName}
            onChange={handleNameChange}
            className="border rounded px-1 py-0.5 text-sm"
          />
        </label>

        <label className="flex flex-col text-sm">
          Type:
          <select
            value={inputType}
            onChange={handleTypeChange}
            className="border rounded px-1 py-0.5 text-sm"
          >
            <option value="Text">Text</option>
            <option value="File">File</option>
          </select>
        </label>
      </div>
    </BaseNode>
  );
};
