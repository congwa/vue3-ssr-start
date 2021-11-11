<template>
  <ProgressBar ref="progressBarRef" />
  <RouterView v-slot="{ Component }" class="body-center">
    <Suspense>
      <component :is="Component" />
    </Suspense>
  </RouterView>
</template>

<script>
  import { ref, reactive } from 'vue'
  import ProgressBar from '../components/ProgressBar'
  import interactImplement from './interactImplement'
  import sxoImplement from './sxoImplement'
  import { useRouter } from 'vue-router'
  export default {
    name: 'Layout',
    components: {
      ProgressBar
    },
    async setup () {
      const router = useRouter();
      const progressBarRef = ref(null)
      interactImplement(progressBarRef)
      sxoImplement()
      return { progressBarRef }
    }
  }
</script>
<style scoped lang="less">
  .header{
    height: 60px;
    border-bottom: 1px solid #dfdfdf;
  }
  .footer{
    background: #313540;
    color: #fff;
  }

</style>
