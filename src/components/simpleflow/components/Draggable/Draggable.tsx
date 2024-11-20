'use client'

interface DraggableProps {
  id: string,
  children: React.ReactNode,
  payload?: object
}

export const Draggable = ({ id, children, payload }: DraggableProps) => {
  
  const handleDragStart = (e: React.DragEvent) => {
    const dragData = {
      id: id,
      payload: payload
    }

    e.dataTransfer.setData('text/plain', JSON.stringify(dragData))
  }
  
  return (
    <div 
      key={id}
      draggable 
      onDragStart={handleDragStart}
    >
      { children }
    </div>
  )
}