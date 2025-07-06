// import { useEffect, useRef } from 'react';
// import { Position } from 'reactflow';
// import { BaseNode } from '../components/BaseNode';
// import { useStore } from '../store';

// export const TextNode = ({ id, data }) => {
//   const textareaRef = useRef(null);
//   const updateNodeField = useStore((state) => state.updateNodeField);

//   const text = data.text || '';
//   const variables = data.variables || [];

//   // Extract variables like {{varName}}
//   const extractVariables = (str) => {
//     return Array.from(
//       new Set([...str.matchAll(/{{\s*([a-zA-Z_$][\w$]*)\s*}}/g)].map((m) => m[1]))
//     );
//   };

//   const handleTextChange = (e) => {
//     const newText = e.target.value;
//     updateNodeField(id, 'text', newText);

//     const foundVars = extractVariables(newText);
//     updateNodeField(id, 'variables', foundVars);
//   };

//   // Auto-resize textarea
//   useEffect(() => {
//     if (textareaRef.current) {
//       textareaRef.current.style.height = 'auto';
//       textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
//     }
//   }, [text]);

//   // Create input handles for each variable
//   const inputHandles = variables.map((v, index) => ({
//     id: v,
//     position: Position.Left,
//     style: { top: `${50 + index * 30}px` },
//   }));

//   return (
//     <BaseNode
//       id={id}
//       key={data.__v} // 👈 ensures re-render when variables update
//       title="📝 Text"
//       inputs={inputHandles}
//       outputs={[
//         {
//           id: 'output',
//           position: Position.Right,
//           style: { top: '50%' },
//         },
//       ]}
//     >
//       <textarea
//         ref={textareaRef}
//         value={text}
//         onChange={handleTextChange}
//         placeholder="Write something... Use {{variable}} to bind."
//         className="w-full resize-none border text-xs p-1 rounded-md outline-none focus:ring-1 focus:ring-blue-400"
//       />
//     </BaseNode>
//   );
// };

import { useState, useEffect, useRef } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from '../components/BaseNode';
import { useStore } from '../store';

export const TextNode = ({ id, data }) => {
  const textareaRef = useRef(null);
  const updateNodeField = useStore((state) => state.updateNodeField);

  const [text, setText] = useState(data.text || '');
  const [variables, setVariables] = useState(data.variables || []);

  // Extract variables like {{varName}}
  const extractVariables = (str) => {
    return Array.from(
      new Set([...str.matchAll(/{{\s*([a-zA-Z_$][\w$]*)\s*}}/g)].map((m) => m[1]))
    );
  };

  const handleTextChange = (e) => {
    const newText = e.target.value;
    setText(newText);

    const foundVars = extractVariables(newText);
    setVariables(foundVars);

    updateNodeField(id, 'text', newText);
    updateNodeField(id, 'variables', foundVars);
  };

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [text]);

  // Use unique handle IDs for variables
  const inputHandles = variables.map((v, index) => ({
    id: `${id}-var-${v}`,
    position: Position.Left,
    style: { top: `${50 + index * 30}px` },
  }));

  return (
    <BaseNode
      id={id}
      // key={data.__v} // <-- REMOVE THIS LINE
      title="📝 Text"
      inputs={inputHandles}
      outputs={[
        {
          id: 'output',
          position: Position.Right,
          style: { top: '50%' },
        },
      ]}
    >
      <textarea
        ref={textareaRef}
        value={text}
        onChange={handleTextChange}
        placeholder="Write something... Use {{variable}} to bind."
        className="w-full resize-none border text-xs p-1 rounded-md outline-none focus:ring-1 focus:ring-blue-400"
      />
    </BaseNode>
  );
};