import { createContext, useState, Dispatch, SetStateAction } from "react"

interface Viewport {
  x: number;
  y: number;
  zoom: number;
}

interface CanvasContextType {
  viewport: Viewport;
  setViewport: Dispatch<SetStateAction<Viewport>>;
}

export const CanvasContext = createContext<CanvasContextType | undefined>(undefined)

export const CanvasProvider: React.FC = ({ children }) => {
  const [viewport, setViewport] = useState({ x: 0, y: 0, zoom: 1 })

  return (
    <CanvasContext.Provider value={{ viewport, setViewport }}>
      { children }
    </CanvasContext.Provider>
  )
}

