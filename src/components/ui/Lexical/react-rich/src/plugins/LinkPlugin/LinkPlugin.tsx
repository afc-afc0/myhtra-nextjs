import { LinkPlugin as LexicalLinkPlugin } from '@lexical/react/LexicalLinkPlugin'
import * as React from 'react'
import { validateUrl } from '../shared/url'
import { JSX } from 'react'

export default function LinkPlugin(): JSX.Element {
  return <LexicalLinkPlugin validateUrl={validateUrl} />
}
