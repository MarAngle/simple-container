<template>
  <div class="complex-layout">
    <template v-if="dependData.load === 'success'">
      <ComplexLayoutLogo :style="logoStyle" />
      <ComplexLayoutHeader :style="headerStyle" />
      <ComplexLayoutSider :style="siderStyle" />
    </template>
    <div class="tab-layout-page" :style="pageStyle" >
      <div class="tab-layout-router">
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

console.log(layout)

export default defineComponent({
  name: 'ComplexLayout',
  components: {
    ComplexLayoutLogo,
    ComplexLayoutHeader,
    ComplexLayoutSider
  },
  data() {
    return {
      dependData: dependData
    }
  },
})
</script>
