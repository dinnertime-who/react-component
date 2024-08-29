// @ts-check

import { defineConfig } from 'tsup';
import { esbuildPluginFilePathExtensions } from 'esbuild-plugin-file-path-extensions';

export default defineConfig([
  modernConfig({ entry: ['src/**/*.ts', 'src/**/*.tsx'] }),
  legacyConfig({ entry: ['src/**/*.ts', 'src/**/*.tsx'] }),
]);

/**
 * @param {Object} opts - Options for building configurations.
 * @param {string[]} opts.entry - The entry array.
 * @returns {import('tsup').Options}
 */
function modernConfig(opts) {
  return {
    entry: opts.entry,
    format: ['cjs', 'esm'],
    target: ['chrome91', 'firefox90', 'edge91', 'safari15', 'ios15', 'opera77'],
    outDir: 'build/modern',
    dts: true,
    sourcemap: true,
    clean: true,
    esbuildPlugins: [esbuildPluginFilePathExtensions({ esmExtension: 'js' })],
  };
}

/**
 * @param {Object} opts - Options for building configurations.
 * @param {string[]} opts.entry - The entry array.
 * @returns {import('tsup').Options}
 */
function legacyConfig(opts) {
  return {
    entry: opts.entry,
    format: ['cjs', 'esm'],
    target: ['es2020', 'node16'],
    outDir: 'build/legacy',
    dts: true,
    sourcemap: true,
    clean: true,
    esbuildPlugins: [esbuildPluginFilePathExtensions({ esmExtension: 'js' })],
  };
}
