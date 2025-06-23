'use client'

interface DraggableProps {
  id: string
  children: React.ReactNode
  payload?: object
}

export const Draggable = ({ id, children, payload }: DraggableProps) => {
  const handleDragStart = (e: React.DragEvent) => {
    e.dataTransfer.setData('text/plain', JSON.stringify(payload))
  }

  return (
    <div key={id} draggable onDragStart={handleDragStart}>
      {children}
    </div>
  )
}
