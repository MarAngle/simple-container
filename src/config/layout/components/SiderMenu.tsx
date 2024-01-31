import { PropType, defineComponent, h } from 'vue'
import { ItemType, Menu, MenuMode, MenuProps, MenuTheme } from 'ant-design-vue'
import { menuType } from '@/config/data/menuData'
import { SubMenuType } from 'ant-design-vue/es/menu/src/interface'

function formatMenu(olist: menuType[]): ItemType[] {
  const list: ItemType[] = []
  for (let i = 0; i < olist.length; i++) {
    const oitem = olist[i];
    const item: ItemType = {
      key: oitem.path,
      label: oitem.meta.name,
      icon: oitem.meta.icon
    }
    if (oitem.children) {
      (item as SubMenuType).children = formatMenu(oitem.children)
    }
    list.push(item)
  }
  return list
}

export default defineComponent({
  name: 'SiderMenu',
  props: {
    menu: {
      type: Array as PropType<menuType[]>,
      required: true
    },
    theme: {
      type: String as PropType<MenuTheme>,
      required: false,
      default: 'dark'
    },
    mode: {
      type: String as PropType<MenuMode>,
      required: false,
      default: 'inline'
    },
    collapsed: {
      type: Boolean,
      required: false,
      default: false
    },
    selectedKeys: {
      type: Array as PropType<string[]>,
      required: false,
      default: () => {
        return []
      }
    }
  },
  data() {
    return {
      currentSelectedKeys: [],
      openKeys: [],
      cachedOpenKeys: []
    } as {
      currentSelectedKeys: string[],
      openKeys: string[],
      cachedOpenKeys: string[]
    }
  },
  emits: ['select'],
  computed: {
    rootSubmenuKeys () {
      const keys: string[] = []
      this.menu.forEach(item => keys.push(item.path))
      return keys
    }
  },
  watch: {
    collapsed (val) {
      if (val) {
        this.cachedOpenKeys = this.openKeys.concat()
        this.openKeys = []
      } else {
        this.openKeys = this.cachedOpenKeys
      }
    },
    selectedKeys: {
      immediate: true,
      handler(val) {
        if (this.currentSelectedKeys !== val) {
          this.currentSelectedKeys = val
        }
      }
    },
    $route: function () {
      this.updateOpenKeys()
    }
  },
  mounted () {
    this.updateOpenKeys()
  },
  methods: {
    updateOpenKeys () {
      const routes = this.$route.matched.concat()
      const openKeys: string[] = []
      if (this.mode === 'inline') {
        routes.forEach(item => {
          openKeys.push(item.path)
        })
      }
      this.collapsed ? (this.cachedOpenKeys = openKeys) : (this.openKeys = openKeys)
    },
    onOpenChange (openKeys: string[]) {
      // 在水平模式下时执行，并且不再执行后续
      if (this.mode === 'horizontal') {
        this.openKeys = openKeys
        return
      }
      // 非水平模式时
      const latestOpenKey = openKeys.find(key => !this.openKeys.includes(key))
      if (!this.rootSubmenuKeys.includes(latestOpenKey!)) {
        this.openKeys = openKeys
      } else {
        this.openKeys = latestOpenKey ? [latestOpenKey] : []
      }
    }
  },
  render() {
    const { mode, theme } = this
    const props: MenuProps = {
      mode: mode,
      theme: theme,
      inlineCollapsed: this.collapsed,
      selectedKeys: this.currentSelectedKeys,
      openKeys: this.openKeys,
      items: formatMenu(this.menu),
      onSelect: ({ selectedKeys, key }) => {
        this.currentSelectedKeys = selectedKeys as string[]
        this.$emit('select', key)
      }
    }
    return h(Menu, props)
  }
})
