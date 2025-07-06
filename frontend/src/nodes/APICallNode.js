import React, { useState, useEffect } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from '../components/BaseNode';
import { useStore } from '../store';

export const APICallNode = ({ id, data }) => {
  const updateNodeField = useStore((state) => state.updateNodeField);

  const [url, setUrl] = useState(data?.url || '');
  const [apiName, setApiName] = useState(data?.name || id.replace('api-', 'api_'));

  useEffect(() => {
    updateNodeField(id, 'url', url);
    updateNodeField(id, 'name', apiName);
  }, []);

  const handleUrlChange = (e) => {
    const newUrl = e.target.value;
    setUrl(newUrl);
    updateNodeField(id, 'url', newUrl);
  };

  const handleNameChange = (e) => {
    const newName = e.target.value;
    setApiName(newName);
    updateNodeField(id, 'name', newName);
  };

  return (
    <BaseNode
     id={id} 
      title="🌐 API Call"
      inputs={[{ id: `${id}-url`, position: Position.Left }]}
      outputs={[{ id: `${id}-response`, position: Position.Right }]}
    >
      <div className="flex flex-col gap-2 text-xs">
        <label className="flex flex-col">
          Name:
          <input
            type="text"
            value={apiName}
            onChange={handleNameChange}
            placeholder="api_name"
            className="border rounded px-1 py-0.5 text-sm"
          />
        </label>

        <label className="flex flex-col">
          API URL:
          <input
            type="text"
            value={url}
            onChange={handleUrlChange}
            placeholder="https://api.example.com/data"
            className="border rounded px-1 py-0.5 text-sm"
          />
        </label>
      </div>
    </BaseNode>
  );
};
