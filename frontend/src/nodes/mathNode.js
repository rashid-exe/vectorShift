import React from 'react';
import { Position } from 'reactflow';
import {BaseNode} from '../components/BaseNode';

export const MathNode = ({ id }) => {
  return (
    <BaseNode
      title="Math Node"
      inputs={[
        { id: `${id}-a`, position: Position.Left, style: { top: '30%' } },
        { id: `${id}-b`, position: Position.Left, style: { top: '70%' } },
      ]}
      outputs={[{ id: `${id}-sum`, position: Position.Right }]}
    >
      <p className="text-sm">Adds A + B</p>
    </BaseNode>
  );
};
