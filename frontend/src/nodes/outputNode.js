import React, { useState } from 'react';
import { Position } from 'reactflow';
import {BaseNode} from '../components/BaseNode'; // adjust the path as needed

export const OutputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(data?.outputName || id.replace('customOutput-', 'output_'));
  const [outputType, setOutputType] = useState(data?.outputType || 'Text');

  const handleNameChange = (e) => {
    setCurrName(e.target.value);
  };

  const handleTypeChange = (e) => {
    setOutputType(e.target.value);
  };

  return (
    <BaseNode
      title="Output Node"
      inputs={[{ id: `${id}-value`, position: Position.Left }]}
      outputs={[]} // No output handles
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
