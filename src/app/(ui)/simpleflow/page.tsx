import { Draggable } from "@components/simpleflow/components/Draggable/Draggable";
import { SimpleFlow } from "@components/simpleflow/SimpleFlow";
import { PageContainer } from "@components/ui/PageContainer/PageContainer";

export default function Home() {
  return (
    <PageContainer>
      <Draggable 
        id="circle" 
        payload={{ type: 'circle', data: { radius: 50 } }}
      >
        Circle
      </Draggable>
      <SimpleFlow />     
    </PageContainer>
  )
}