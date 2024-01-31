import { reactive } from "vue"
import { PluginLayout } from "complex-plugin"
import menuData from '../data/menuData'

const getSiderWidth = function() {
  return menuData.collapsed ? 80 : 200
}

PluginLayout.$format = function(data) {
  return reactive(data)
}

const pluginLayout = new PluginLayout({
  sider: reactive({
    width: getSiderWidth(),
    change() {
      this.width = getSiderWidth()
    }
  }),
  header: reactive({
    height: 60
  })
})

export default pluginLayout
