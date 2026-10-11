import nextVitals from 'eslint-config-next/core-web-vitals'
import sortKeysFix from 'eslint-plugin-sort-keys-fix'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  ...nextVitals,
  {
    plugins: { 'sort-keys-fix': sortKeysFix },
    rules: {
      // React Compiler rules new in eslint-config-next 16. Existing hits are mostly in the
      // vendored Lexical editor (due for upgrade); fixing them means refactoring effects,
      // so warn until that work is done rather than block lint.
      'react-hooks/refs': 'warn',
      'react-hooks/set-state-in-effect': 'warn',
      'sort-keys-fix/sort-keys-fix': 'error'
    }
  },
  globalIgnores(['.claude/**', 'node_modules/**', '.next/**', 'out/**', 'build/**', 'next-env.d.ts', 'certificates/**'])
])
