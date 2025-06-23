export const focusOnView = ({ event, elementId }: { event: React.MouseEvent; elementId: string }) => {
  event.preventDefault()
  const element = document.getElementById(elementId)

  if (!element) {
    console.warn('Element not found can not focus on the element')
    return
  }

  element.scrollIntoView({
    behavior: 'smooth'
  })
}
