import { CircleData } from '@simpleflow/components/DragDropElements/Circle/Circle'
import { StartData } from '../components/DragDropElements/Start/Start'

export interface Position {
  x: number
  y: number
}

export const defaultPosition: Position = { x: 0, y: 0 }

export type NodeData = CircleData | StartData

export interface BaseNodePayload<T extends NodeData> {
  position: Position
  type: string
  data: T
}

export interface BaseNodeProps<T extends NodeData> {
  id: string
  payload: BaseNodePayload<T>
}

export interface BaseDragAndDropConfig<T extends NodeData> {
  type: string
  draggableComponent: React.ComponentType
  nodeComponent: React.ComponentType<BaseNodeProps<T>>
  payload: BaseNodePayload<T>
}
