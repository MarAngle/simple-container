import { InjectionKey } from "vue"
import { PluginLayout } from "complex-plugin"

export const pluginLayoutKey = Symbol('pluginLayout') as InjectionKey<PluginLayout>
