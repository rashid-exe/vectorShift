import React from 'react';
import { Position } from 'reactflow';
import {BaseNode} from '../components/BaseNode'; 

export const LLMNode = ({ id }) => {
  return (
    <BaseNode
      title="LLM Node"
      inputs={[
        { id: `${id}-system`, position: Position.Left, style: { top: `${100 / 3}%` } },
        { id: `${id}-prompt`, position: Position.Left, style: { top: `${200 / 3}%` } },
      ]}
      outputs={[
        { id: `${id}-response`, position: Position.Right },
      ]}
    >
      <div className="text-sm text-gray-700">
        <p>This is a LLM.</p>
      </div>
    </BaseNode>
  );
};
