export const DraggableNode = ({ type, label }) => {
  const onDragStart = (event, nodeType) => {
    const appData = { nodeType };
    event.target.style.cursor = 'grabbing';
    event.dataTransfer.setData('application/reactflow', JSON.stringify(appData));
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div
      draggable
      onDragStart={(event) => onDragStart(event, type)}
      onDragEnd={(event) => (event.target.style.cursor = 'grab')}
      className={`
        ${type}
        cursor-grab select-none
        w-28 h-14 px-2 py-1
        flex items-center justify-center
        rounded-xl bg-slate-800 text-white
        font-semibold text-sm text-center
        shadow-sm hover:bg-slate-700
        hover:scale-105 transition-all
      `}
    >
      <span className="whitespace-nowrap">{label}</span>
    </div>
  );
};
