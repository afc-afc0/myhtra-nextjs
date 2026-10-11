import nextVitals from 'eslint-config-next/core-web-vitals'
import sortKeysFix from 'eslint-plugin-sort-keys-fix'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  ...nextVitals,
  {
    plugins: { 'sort-keys-fix': sortKeysFix },
    rules: {
      'sort-keys-fix/sort-keys-fix': 'error'
    }
  },
  globalIgnores(['.claude/**', 'node_modules/**', '.next/**', 'out/**', 'build/**', 'next-env.d.ts', 'certificates/**'])
])
