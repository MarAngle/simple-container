import { reactive } from "vue"
import { PluginLayout } from "complex-plugin"
import menuData from '../data/menuData'

const getSiderWidth = function() {
  return menuData.collapsed ? 80 : 200
}

PluginLayout.$format = function(data) {
  return reactive(data) as PluginLayout
}

const pluginLayout = new PluginLayout({
  sider: reactive({
    width: getSiderWidth(),
    onChange() {
      this.width = getSiderWidth()
    }
  }),
  header: reactive({
    height: 60
  })
})

export default pluginLayout
