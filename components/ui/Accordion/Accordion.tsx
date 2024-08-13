

interface AccordionProps {
  children: React.ReactNode,
  title: string,
  isOpen?: boolean,
  onToggle?: () => void
}

export const Accordion = ({ children, title, isOpen = false, onToggle } : AccordionProps) => {
  return (
    <>

    </>
  )
}