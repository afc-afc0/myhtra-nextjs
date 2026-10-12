'use client'

import { Button } from '@components/ui/Button/Button'

// The browser's print dialog has "Save as PDF", so the PDF is always built from the current data.
export const PrintButton = () => <Button text="Download PDF" onClick={() => window.print()} />
