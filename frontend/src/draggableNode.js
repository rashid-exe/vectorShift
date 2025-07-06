export const DraggableNode = ({ type, label }) => {
  const onDragStart = (event, nodeType) => {
    const appData = { nodeType };
    event.target.style.cursor = 'grabbing';
    event.dataTransfer.setData('application/reactflow', JSON.stringify(appData));
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div
      onDragStart={(event) => onDragStart(event, type)}
      onDragEnd={(event) => (event.target.style.cursor = 'grab')}
      draggable
      className={`
        ${type}
        cursor-grab 
        min-w-[80px] h-[60px] 
        flex items-center justify-center flex-col 
        rounded-md bg-slate-800 
        text-white font-medium 
        text-sm shadow-md 
        hover:bg-slate-700 
        hover:scale-105 
        transition-transform
      `}
    >
      <span>{label}</span>
    </div>
  );
};
