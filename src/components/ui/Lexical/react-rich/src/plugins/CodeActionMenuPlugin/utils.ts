/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
import { debounce } from 'lodash-es'
import { useLayoutEffect, useMemo, useRef } from 'react'

export function useDebounce<T extends (...args: never[]) => void>(fn: T, ms: number, maxWait?: number) {
  const funcRef = useRef<T | null>(null)

  useLayoutEffect(() => {
    funcRef.current = fn
  }, [fn])

  // lodash's debounce never calls `fn` synchronously, so the ref is only read after render
  // eslint-disable-next-line react-hooks/refs
  return useMemo(() => debounce((...args: Parameters<T>) => funcRef.current?.(...args), ms, { maxWait }), [ms, maxWait])
}
