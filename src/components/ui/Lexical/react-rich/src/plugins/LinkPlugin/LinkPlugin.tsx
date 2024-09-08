import {LinkPlugin as LexicalLinkPlugin} from '@lexical/react/LexicalLinkPlugin';
import * as React from 'react';
import { validateUrl } from '../shared/url';

export default function LinkPlugin(): JSX.Element {
  return <LexicalLinkPlugin validateUrl={validateUrl} />;
}
