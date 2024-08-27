import clsx from "clsx"
import { useState } from "react"

import styles from './Expandable.module.css'

interface ExpandableContainerProps {
  children: React.ReactNode,
  isExpanded: boolean,
  initialSize: string,
  transitionSize: string,
}

// Simple container that can be expanded or collapsed depending on the isExpanded prop
// initialSize and transitionSize are css classes that define the size of the container
// they should prefarably define width and height values for transition purposes
export const ExpandableContainer = ({ children, isExpanded, initialSize, transitionSize } : ExpandableContainerProps) => {
  return (
    <div className={clsx(styles.container, !isExpanded && initialSize, isExpanded && transitionSize)}>
      { children }
    </div>
  )
}

export const useExpandable = ({ initialState = false } : { initialState: boolean }) => {
  const [isExpanded, setIsExpanded] = useState(initialState)

  const toggle = () => {
    setIsExpanded(!isExpanded)
  }

  return { isExpanded, toggle }
}