<template>
  <div class="test">

  </div>
</template>

<script lang="ts">
import { formatTree } from 'complex-utils';
import { defineComponent } from 'vue';

const list = [
  {
    id: 1,
    parentId: 0,
    data: 1
  },
  {
    id: 2,
    parentId: 0,
    data: 2
  },
  {
    id: 3,
    parentId: 0,
    data: 3
  },
  {
    id: 4,
    parentId: 8,
    data: 4
  },
  {
    id: 5,
    parentId: 7,
    data: 5
  },
  {
    id: 6,
    parentId: 1,
    data: 6
  },
  {
    id: 7,
    parentId: 2,
    data: 7
  },
  {
    id: 8,
    parentId: 1,
    data: 8
  },
]

const a = formatTree(list, {
    format: (data) => {
      data.name = data.id * 2
      return data
    },
    childrenBuild: true
  })

console.log(a, a.parse())

export default defineComponent({
  name: 'TestView'
});
</script>
