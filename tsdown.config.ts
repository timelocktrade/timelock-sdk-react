// eslint-disable-next-line n/no-unpublished-import
import {defineConfig} from 'tsdown';

export default defineConfig({
  entry: ['src/package.ts'],
  format: ['esm', 'cjs'],
  dts: true,
  clean: true,
  outDir: 'dist',
  external: [
    // Peer dependencies should be external (not bundled)
    'react',
    'react-dom',
    '@tanstack/react-query',
    'viem',
    'wagmi',
    'graphql',
    'graphql-request',
    'graphql-tag',
    'jsbi',
    '@uniswap/v3-sdk',
    'big.js',
  ],
  platform: 'neutral',
  sourcemap: true,
  minify: true,
  shims: false,
  treeshake: true,
  skipNodeModulesBundle: true,
});
