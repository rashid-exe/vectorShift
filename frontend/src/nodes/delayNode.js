import React, { useState } from 'react';
import { Position } from 'reactflow';
import {BaseNode} from '../components/BaseNode';

export const DelayNode = ({ id }) => {
  const [delay, setDelay] = useState(1000);

  return (
    <BaseNode
      title="Delay Node"
      inputs={[{ id: `${id}-input`, position: Position.Left }]}
      outputs={[{ id: `${id}-output`, position: Position.Right }]}
    >
      <label className="flex flex-col text-sm">
        Delay (ms):
        <input
          type="number"
          value={delay}
          onChange={(e) => setDelay(Number(e.target.value))}
          className="border rounded px-1 py-0.5 text-sm"
        />
      </label>
    </BaseNode>
  );
};
