<style scoped>
.complex-layout{
  width: 100%;
  height: 100%;
  .complex-layout-logo{
    position: fixed;
    top: 0;
    left: 0;
    z-index: 101;
    transition: all 0.3s cubic-bezier(0.2, 0, 0, 1) 0s;
  }
  .complex-layout-header{
    position: fixed;
    top: 0;
    right: 0;
    z-index: 100;
    transition: left 0.3s cubic-bezier(0.2, 0, 0, 1) 0s;
    box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.1);
  }
  .complex-layout-sider{
    position: fixed;
    left: 0;
    bottom: 0;
    z-index: 102;
    transition: width 0.3s cubic-bezier(0.2, 0, 0, 1) 0s;
  }
  .complex-layout-page{
    width: 100%;
    height: 100%;
    transition: padding 0.3s cubic-bezier(0.2, 0, 0, 1) 0s;
    .complex-layout-router{
      width: 100%;
      height: 100%;
      overflow: auto;
      position: relative;
    }
  }
}
</style>
<template>
  <div class="complex-layout">
    <template v-if="dependData.load === 'success'">
      <ComplexLayoutLogo :style="logoStyle" />
      <ComplexLayoutHeader :style="headerStyle" />
      <ComplexLayoutSider :style="siderStyle" />
    </template>
    <div class="complex-layout-page" :style="pageStyle" >
      <div class="complex-layout-router">
        <router-view v-slot="{ Component }">
          <keep-alive v-if="$route.meta.keepAlive">
            <component :is="Component" />
          </keep-alive>
          <component v-else :is="Component" />
        </router-view>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import dependData from '@/config/data/dependData'
import ComplexLayoutLogo from './ComplexLayoutLogo.vue'
import ComplexLayoutHeader from './ComplexLayoutHeader.vue'
import ComplexLayoutSider from './ComplexLayoutSider.vue'
import { layout } from 'complex-plugin'
import config from 'complex-data/config'

export default defineComponent({
  name: 'ComplexLayout',
  components: {
    ComplexLayoutLogo,
    ComplexLayoutHeader,
    ComplexLayoutSider
  },
  data() {
    return {
      dependData: dependData,
      layout: layout
    }
  },
  computed: {
    siderWidth() {
      return config.formatPixel(this.layout.mod.sider.width!)
    },
    headerHeight() {
      return config.formatPixel(this.layout.mod.header.height!)
    },
    logoStyle() {
      return {
        width: this.siderWidth,
        height: this.headerHeight
      }
    },
    headerStyle() {
      return {
        left: this.siderWidth,
        height: this.headerHeight
      }
    },
    siderStyle() {
      return {
        width: this.siderWidth,
        top: this.headerHeight
      }
    },
    pageStyle() {
      if (this.layout.type === 'default' && this.dependData.load === 'success') {
        return {
          paddingLeft: this.siderWidth,
          paddingTop: this.headerHeight
        }
      } else {
        return {}
      }
    }
  }
})
</script>
