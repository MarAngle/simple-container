<style scoped>
.complex-layout-sider{
  background-color: #000c17;
  border-top: 1px rgba(255, 255, 255, 0.45) solid;
  display: flex;
  flex-direction: column;

}
</style>
<template>
  <div class="complex-layout-sider">
    <div class="complex-layout-sider-menu">
      <SiderMenu
        mode="inline"
        theme="dark"
        :menu="menuList"
        :selectedKeys="menuData.current"
        :collapsed="menuData.collapsed"
        @select="onSelect"
      />
    </div>
    <div class="complex-layout-sider-collapsed">
      <a-button type="primary" style="margin-bottom: 16px" @click="toggleCollapsed">
        <MenuUnfoldOutlined v-if="menuData.collapsed" />
        <MenuFoldOutlined v-else />
      </a-button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons-vue'
import router from '@/config/router/index'
import SiderMenu from './components/SiderMenu'
import menuData from '../data/menuData'

export default defineComponent({
  name: 'ComplexLayoutSider',
  components: {
    SiderMenu,
    MenuFoldOutlined,
    MenuUnfoldOutlined
  },
  data() {
    return {
      menuData: menuData
    }
  },
  computed: {
    menuList() {
      return this.menuData.list
    }
  },
  watch: {
    $route: {
      immediate: true,
      handler(val) {
        this.menuData.setCurrent(val)
      }
    }
  },
  methods: {
    toggleCollapsed() {
      this.menuData.toggleCollapsed()
    },
    onSelect(key: string) {
      if (key !== this.menuData.current[0]) {
        router.push(key)
      }
    },
  }
})
</script>
