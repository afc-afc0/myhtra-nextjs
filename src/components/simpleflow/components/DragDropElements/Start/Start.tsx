import { Draggable } from "@simpleflow/components/Draggable/Draggable"
import { BaseNodePayload, BaseDragAndDropConfig, BaseNodeProps, defaultPosition } from "@components/simpleflow/shared/types"
import { Node } from "@simpleflow/components/Node/Node"
import { FlexContainer } from "@components/ui/Layout/FlexContainer/FlexContainer"

export const StartDraggable = () => {
  return (
    <Draggable
      id='start'
      payload={config.payload}
    >
      Start Node
    </Draggable>
  )
}

export const StartNode = ({ id, payload }: StartNodeProps) => {
  return (
    <Node id={id} key={id} position={payload.position}>
      <div style={{ width: '10rem', height: '4rem'}}>
        <FlexContainer
          width='inherit'
          height='inherit'
          flexDirection='row'
          borderWidth='m'
          borderRadius='m'
        >
          <FlexContainer
            width='33%'
            height='100%'
            justifyContent='center'
            alignItems='center'
          >
            Icon
          </FlexContainer>
          <FlexContainer
            width='auto'
            height='25%'
          >
            Start Node
          </FlexContainer>
        </FlexContainer>
      </div>
    </Node>
  )
}

const type = 'start'

export interface StartData {
  text: string
}

type StartNodeProps = BaseNodeProps<StartData>
export type StartPayload = BaseNodePayload<StartData>

export const config: BaseDragAndDropConfig<StartData> = {
  type,
  draggableComponent: StartDraggable,
  nodeComponent: StartNode,
  payload: { type, data: { text: 'Start' }, position: defaultPosition }
}