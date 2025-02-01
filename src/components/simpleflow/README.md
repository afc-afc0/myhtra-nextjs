# Adding a new component for drag and drop

1. You can look at the Nodes that are defined(CircleNode) and create you component in the same way
2. Although it would be good to do all this from one file, we still need to add the component to config and add the type to      NodeData. 
   a) Go to config.ts(under shared folder) file and add your component
      Example: [circleConfig.type]: circleConfig
   b) Go to types.ts(under shared folder) file and add your type data
      Example: export type NodeData = CircleData | <your type>


Some thoughts: Instead of drag and drop we cxan just put + button to add the nodes