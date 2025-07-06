import { useState, useEffect, useRef, useMemo } from "react";
import { Position, useUpdateNodeInternals } from "reactflow";
import { BaseNode } from "../components/BaseNode";
import { useStore } from "../store";

export const TextNode = ({ id, data }) => {
  const textareaRef = useRef(null);
  const updateNodeField = useStore((state) => state.updateNodeField);
  const onConnect = useStore((state) => state.onConnect);
  const updateNodeInternals = useUpdateNodeInternals();
  const nodes = useStore((state) => state.nodes); 

  const [text, setText] = useState(data.text || "");
  const [variables, setVariables] = useState(data.variables || []);

  useEffect(() => {
    updateNodeInternals(id);
  }, [variables, id, updateNodeInternals]);

  
  const availableVariables = useMemo(() => {
    return nodes
      .filter((n) => n.id !== id && n.data?.name)
      .map((n) => ({ label: n.data.name, nodeId: n.id }));
  }, [nodes, id]);

  const extractVariables = (str) => {
    return Array.from(
      new Set(
        [...str.matchAll(/{{\s*([a-zA-Z_$][\w$]*)\s*}}/g)].map((m) => m[1])
      )
    );
  };

  const handleTextChange = (e) => {
    const newText = e.target.value;
    setText(newText);

    const foundVars = extractVariables(newText);
    setVariables(foundVars);

    updateNodeField(id, "text", newText);
    updateNodeField(id, "variables", foundVars);
  };

  const handleInsertVariable = (variable) => {
    const newText = `${text}{{${variable.label}}}`;
    setText(newText);
    textareaRef.current.focus();

    const newVars = extractVariables(newText);
    setVariables(newVars);
    updateNodeField(id, "text", newText);
    updateNodeField(id, "variables", newVars);

    onConnect({
      source: variable.nodeId,
      sourceHandle: `${variable.nodeId}-value`,
      target: id,
      targetHandle: `${id}-var-${variable.label}`,
    });
  };

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [text]);

  const inputHandles = variables.map((v, index) => ({
    id: `${id}-var-${v}`,
    position: Position.Left,
    style: { top: `${50 + index * 30}px` },
  }));

  return (
    <BaseNode
      id={id}
      title="📝 Text"
      inputs={inputHandles}
      outputs={[
        {
          id: "output",
          position: Position.Right,
          style: { top: "50%" },
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

      <div className="mt-2 text-xs">
        <label className="block mb-1 text-gray-600">Insert Variable</label>
        <select
          onChange={(e) => {
            const selected = availableVariables.find(
              (v) => v.label === e.target.value
            );
            if (selected) handleInsertVariable(selected);
          }}
          defaultValue=""
          className="border rounded p-1 text-xs w-full"
        >
          <option value="" disabled>
            Select variable
          </option>
          {availableVariables.map((v) => (
            <option key={v.nodeId} value={v.label}>
              {v.label}
            </option>
          ))}
        </select>
      </div>
    </BaseNode>
  );
};
