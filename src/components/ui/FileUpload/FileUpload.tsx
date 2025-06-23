import { Input } from '../Form/Input/Input'
import { FlexContainer } from '../Layout/FlexContainer/FlexContainer'
import styles from './FileUpload.module.css'

export const FileUploadWithLink = () => {
  return (
    <FlexContainer flexDirection="column">
      <Input
        type="file"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0]
          if (file) {
            console.log(`File selected: ${file.name}`)
          }
        }}
        value={''}
      />
    </FlexContainer>
  )
}
