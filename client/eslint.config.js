import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      globals: globals.browser,
    },
    rules: {
      // The codebase consistently uses the standard "fetch on mount"
      // effect pattern (useEffect -> async loader -> setState). It's a
      // safe, well-understood pattern; downgraded to a warning rather
      // than rewritten wholesale to Suspense/data-library patterns.
      'react-hooks/set-state-in-effect': 'warn',
      // Context + its paired hook are intentionally colocated for
      // ergonomics; splitting into separate files isn't worth the churn.
      'react-refresh/only-export-components': 'warn',
    },
  },
])
