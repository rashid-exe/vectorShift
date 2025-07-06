import React, { useState } from 'react';
import { Position } from 'reactflow';
import {BaseNode} from '../components/BaseNode'; // adjust the path if needed

export const InputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(data?.inputName || id.replace('customInput-', 'input_'));
  const [inputType, setInputType] = useState(data?.inputType || 'Text');

  const handleNameChange = (e) => {
    setCurrName(e.target.value);
  };

  const handleTypeChange = (e) => {
    setInputType(e.target.value);
  };

  return (
    <BaseNode
      title="Input Node"
      inputs={[]} // No input handles
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
