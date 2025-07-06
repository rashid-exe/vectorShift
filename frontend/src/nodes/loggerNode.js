import React from 'react';
import { Position } from 'reactflow';
import {BaseNode} from '../components/BaseNode';

export const LoggerNode = ({ id }) => {
  return (
    <BaseNode
      title="Logger Node"
      inputs={[{ id: `${id}-log`, position: Position.Left }]}
      outputs={[]}
    >
      <p className="text-sm">Logs incoming data to console</p>
    </BaseNode>
  );
};
