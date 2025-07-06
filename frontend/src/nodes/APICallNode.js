import React from 'react';
import { Position } from 'reactflow';
import {BaseNode} from '../components/BaseNode';

export const APICallNode = ({ id }) => {
  return (
    <BaseNode
      title="API Call Node"
      inputs={[{ id: `${id}-url`, position: Position.Left }]}
      outputs={[{ id: `${id}-response`, position: Position.Right }]}
    >
      <p className="text-sm">Calls an external API with given URL</p>
    </BaseNode>
  );
};
