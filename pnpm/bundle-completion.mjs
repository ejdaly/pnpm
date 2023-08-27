import { build } from "esbuild";
import { statSync } from "fs";

const config = {
  externals: [
    "@pnpm/workspace.find-packages",
    "@pnpm/read-project-manifest",
    '@pnpm/manifest-utils'
  ],
  input: {
    index: "./lib/completion/index.js",
    externals: "./lib/completion/externals.js"
  },
  output: {
    index: "./dist/completion/pnpmCompletion.cjs",
    externals: "./dist/completion/pnpmCompletionExternals.cjs"
  },
  esbuild: {
    bundle: true,
    platform: "node",
    format  : "cjs",
    target  : "esnext",
    treeShaking: true,
  }
}

// https://github.com/evanw/esbuild/issues/1895#issuecomment-1003404929
//
const noSideEffectsPlugin = {
  name: 'no-side-effects',
  setup(build) {
    build.onResolve({ filter: /.*/ }, async args => {
      if (args.pluginData) return // Ignore this if we called ourselves
      if (args.path.includes("supports-color")) return;

      try {
        const { path, ...rest } = args
        rest.pluginData = true // Avoid infinite recursion
        const result = await build.resolve(path, rest)
        
        result.sideEffects = false
        return result
      } catch {
        console.log({ args })
        return
      }  
    })
  }
}



const externalsPlugin = {
  name: 'externals',
  setup(build) {
    for (const external of config.externals) {
      build.onResolve({ filter: new RegExp(`^${external}$`) }, async args => {
        return {
          path: "./pnpmCompletionExternals.cjs",
          external: true
        }    
      })
    }
  }
}

await build({
  entryPoints: [ config.input.index ],
  outfile: config.output.index, 
  plugins: [ noSideEffectsPlugin, externalsPlugin ],

  external: [
    // uid-number@0.0.6/node_modules/uid-number/uid-number.js:31:31
    "./get-uid-gid.js", 
    // adm-zip tries to require this (in a try-catch)
    "original-fs",
    "./pnpmCompletionExternals.cjs",
    ...config.externals
  ],
  ...config.esbuild
})
const indexSizeKB = Math.round(statSync(config.output.index).size / (1024))
console.log(`Bundling ${config.output.index} ............ [${indexSizeKB} KB]`);

await build({
  entryPoints: [ config.input.externals ],
  outfile: config.output.externals,
  plugins: [ noSideEffectsPlugin ],
  ...config.esbuild
})
const externalsSizeKB = Math.round(statSync(config.output.externals).size / (1024))
console.log(`Bundling ${config.output.externals} ... [${externalsSizeKB} KB]`);