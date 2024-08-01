await Bun.build({
  entrypoints: ['./src/content/index.ts',],
  outdir: './dist/extension_scripts',
  naming: "[dir]/content.[ext]"
})

await Bun.build({
  entrypoints: ['./src/background/index.ts'],
  outdir: './dist/extension_scripts',
  naming: "[dir]/background.[ext]"
})


export { };
