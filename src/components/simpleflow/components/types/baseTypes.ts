import { Position } from "@components/simpleflow/types/types"

export interface BaseNodeProps {
  id: string
  position: Position
}

export interface BaseNodePayload {
  type: string
  data: Record<string, any>
}

export interface BaseDragAndDropConfig<T extends BaseNodePayload> {
  type: T['type']
  panelComponent: React.ComponentType<any>
  canvasComponent: React.ComponentType<any>
  payload: T
}
