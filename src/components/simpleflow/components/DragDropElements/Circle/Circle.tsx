import { Draggable } from "@simpleflow/components/Draggable/Draggable"
import { BaseNodePayload, BaseDragAndDropConfig, BaseNodeProps, defaultPosition } from "@components/simpleflow/shared/types"
import { Node } from "@simpleflow/components/Node/Node"

export const CircleDraggable = () => {
  return (
    <Draggable
      id="circle"
      payload={config.payload}
    >
      Circle
    </Draggable>
  )
}

export const CircleNode = ({ id, payload }: CircleNodeProps) => {
  return (
    <Node id={id} key={id} position={payload.position}>
      { payload.data.radius }
    </Node>
  )
}

const type = 'circle'
export interface CircleData {
  radius: number
}

type CircleNodeProps = BaseNodeProps<CircleData>
export type CirclePayload = BaseNodePayload<CircleData>

export const config: BaseDragAndDropConfig<CircleData> = {
  type,
  draggableComponent: CircleDraggable,
  nodeComponent: CircleNode,
  payload: { type, data: { radius: 50 }, position: defaultPosition }
}