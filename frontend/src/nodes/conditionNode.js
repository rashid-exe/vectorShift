import React from 'react';
import { Position } from 'reactflow';
import {BaseNode} from '../components/BaseNode';

export const ConditionNode = ({ id }) => {
  return (
    <BaseNode
      title="Condition Node"
      inputs={[{ id: `${id}-input`, position: Position.Left }]}
      outputs={[
        { id: `${id}-true`, position: Position.Right, style: { top: '30%' } },
        { id: `${id}-false`, position: Position.Right, style: { top: '70%' } },
      ]}
    >
      <p className="text-sm">If input is true → true path, else false path</p>
    </BaseNode>
  );
};
