'use client'

import { $isCodeNode } from '@lexical/code'
import { $getNearestNodeFromDOMNode, LexicalEditor } from 'lexical'
import { Options } from 'prettier'
import * as React from 'react'
import { useState } from 'react'

import styles from './PrettierButton.module.css'
import clsx from 'clsx'

interface Props {
  lang: string
  editor: LexicalEditor
  getCodeDOMNode: () => HTMLElement | null
}

const PRETTIER_PARSER_MODULES = {
  css: () => import('prettier/parser-postcss'),
  html: () => import('prettier/parser-html'),
  js: () => import('prettier/parser-babel'),
  markdown: () => import('prettier/parser-markdown')
} as const

type LanguagesType = keyof typeof PRETTIER_PARSER_MODULES

async function loadPrettierParserByLang(lang: string) {
  const dynamicImport = PRETTIER_PARSER_MODULES[lang as LanguagesType]
  return await dynamicImport()
}

async function loadPrettierFormat() {
  const { format } = await import('prettier/standalone')
  return format
}

const PRETTIER_OPTIONS_BY_LANG: Record<string, Options> = {
  css: {
    parser: 'css'
  },
  html: {
    parser: 'html'
  },
  js: {
    parser: 'babel'
  },
  markdown: {
    parser: 'markdown'
  }
}

const LANG_CAN_BE_PRETTIER = Object.keys(PRETTIER_OPTIONS_BY_LANG)

export function canBePrettier(lang: string): boolean {
  return LANG_CAN_BE_PRETTIER.includes(lang)
}

function getPrettierOptions(lang: string): Options {
  const options = PRETTIER_OPTIONS_BY_LANG[lang]
  if (!options) {
    throw new Error(`CodeActionMenuPlugin: Prettier does not support this language: ${lang}`)
  }

  return options
}

export function PrettierButton({ lang, editor, getCodeDOMNode }: Props) {
  const [syntaxError, setSyntaxError] = useState<string>('')
  const [tipsVisible, setTipsVisible] = useState<boolean>(false)

  async function handleClick(): Promise<void> {
    const codeDOMNode = getCodeDOMNode()

    try {
      const format = await loadPrettierFormat()
      const options = getPrettierOptions(lang)
      options.plugins = [await loadPrettierParserByLang(lang)]

      if (!codeDOMNode) {
        return
      }

      editor.update(() => {
        const codeNode = $getNearestNodeFromDOMNode(codeDOMNode)

        if ($isCodeNode(codeNode)) {
          const content = codeNode.getTextContent()

          format(content, options)
            .then((parsed) => {
              if (parsed !== '') {
                const selection = codeNode.select(0)
                selection.insertText(parsed)
                setSyntaxError('')
                setTipsVisible(false)
              }
            })
            .catch((error: unknown) => {
              setError(error)
            })
        }
      })
    } catch (error: unknown) {
      setError(error)
    }
  }

  function setError(error: unknown) {
    if (error instanceof Error) {
      setSyntaxError(error.message)
      setTipsVisible(true)
    } else {
      console.error('Unexpected error: ', error)
    }
  }

  function handleMouseEnter() {
    if (syntaxError !== '') {
      setTipsVisible(true)
    }
  }

  function handleMouseLeave() {
    if (syntaxError !== '') {
      setTipsVisible(false)
    }
  }

  return (
    <div className={styles['prettier-wrapper']}>
      <button
        className={styles['menu-item']}
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        aria-label="prettier"
      >
        {syntaxError ? (
          <i className={clsx(styles['format'], styles['prettier-error'])} />
        ) : (
          <i className={clsx(styles['format'], styles['prettier'])} />
        )}
      </button>
      {tipsVisible ? <pre className={styles['code-error-tips']}>{syntaxError}</pre> : null}
    </div>
  )
}
