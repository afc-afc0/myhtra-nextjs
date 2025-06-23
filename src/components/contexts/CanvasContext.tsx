import { Position } from '@components/simpleflow/shared/types'
import { createContext, useState, Dispatch, SetStateAction } from 'react'

interface Viewport {
  position: Position
  zoom: number
}

interface CanvasContextType {
  viewport: Viewport
  setViewport: Dispatch<SetStateAction<Viewport>>
}

export const CanvasContext = createContext<CanvasContextType | undefined>(undefined)

interface CanvasProviderProps {
  children: React.ReactNode
}

export const CanvasProvider: React.FC<CanvasProviderProps> = ({ children }) => {
  const [viewport, setViewport] = useState<Viewport>({ position: { x: 0, y: 0 }, zoom: 1 })

  return <CanvasContext.Provider value={{ setViewport, viewport }}>{children}</CanvasContext.Provider>
}
