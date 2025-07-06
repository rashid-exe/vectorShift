import React, { useState, useEffect } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from '../components/BaseNode';
import { useStore } from '../store';

export const OutputNode = ({ id, data }) => {
  const updateNodeField = useStore((state) => state.updateNodeField);

  const [currName, setCurrName] = useState(data?.outputName || id.replace('customOutput-', 'output_'));
  const [outputType, setOutputType] = useState(data?.outputType || 'Text');

  useEffect(() => {
    updateNodeField(id, 'name', currName); 
  }, []);

  const handleNameChange = (e) => {
    const newName = e.target.value;
    setCurrName(newName);
    updateNodeField(id, 'name', newName);
  };

  const handleTypeChange = (e) => {
    setOutputType(e.target.value);
    updateNodeField(id, 'outputType', e.target.value);
  };

  return (
    <BaseNode
      id={id} 
      title="📤 Output Node"
      inputs={[{ id: `${id}-value`, position: Position.Left }]}
      outputs={[]}
    >
      <div className="flex flex-col gap-2 text-sm text-gray-700">
        <label className="flex flex-col">
          Name:
          <input
            type="text"
            value={currName}
            onChange={handleNameChange}
            placeholder="output_name"
            className="border rounded px-1 py-0.5 text-sm"
          />
        </label>

        <label className="flex flex-col">
          Type:
          <select
            value={outputType}
            onChange={handleTypeChange}
            className="border rounded px-1 py-0.5 text-sm"
          >
            <option value="Text">Text</option>
            <option value="File">Image</option>
          </select>
        </label>
      </div>
    </BaseNode>
  );
};
