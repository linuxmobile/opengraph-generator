import { defineConfig, presetWind } from 'unocss'

export default defineConfig({
  presets: [
    presetWind()
  ],
  safelist: [
    'font-bold', 'text-lg', 'font-semibold',
    'font-medium', 'text-md', 'font-normal',
    'font-light', 'text-sm', 'font-thin',
    'font-extrabold', 'text-xl',
    'text-xs', 'font-extralight'
  ]
})