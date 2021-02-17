import SiteMappings from './common/injected.js'
import { findConfig, saveConfig } from './common/support.js'

Object.assign(window, {
  SiteMappings,
  findConfig,
  saveConfig
})
