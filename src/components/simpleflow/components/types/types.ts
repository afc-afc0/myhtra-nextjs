import { Position } from "@components/simpleflow/types/types";

export interface DragAndDropConfig {
  type: string;
  drag: React.ReactElement<any>;
  drop: React.ReactElement<any>;
  payload: any;
}

export interface NodeProps {
  id: string;
  position: Position;
}

// TODO: Continue with creating a payload type for circle for type safety