<template>
  <div>
    {{ homeData.abc }}
    <div id="container" style="width: 240px; height: 280px;" />
    <div id="container-raptor" style="width: 240px; height: 280px;" />
  </div>
</template>

<script>
  import { reactive, onMounted } from 'vue'
  import { useInteract, useSession, useSyncState, useRequest, useSXO } from '../hooks/app'

  async function setup () {
    const { loading, toast } = useInteract()
    const { host } = useSession()
    const syncState = useSyncState()
    /* eslint-disable-next-line */
    const request = useRequest()
    const { setSEO, setSMO } = useSXO()

    if (!syncState.homeData) {
      syncState.homeData = await Promise.resolve({ host: host.value, abc: 123 }) // mock
    }

    const homeData = reactive(syncState.homeData)

    setSEO({
      title: 'Home page',
      description: 'description after server fetch'
    })
    setSMO({ title: 'Home page title after server fetch' })

    onMounted(() => {
      loading.open('loading...')
      setTimeout(loading.close, 1000)
      toast('123')
      // eslint-disable-next-line no-undef
      const spineDom = new spine.SpinePlayer('container', {
        jsonUrl: '/spine/spine1.json',
        atlasUrl: 'spine/spine1.atlas',
        animation: 'animation',
        alpha: true,
        premultipliedAlpha: false,
        backgroundColor: '#00000000',
        viewport: {
          debugRender: false,
        },
        showControls: false,
      });
    })

    return {
      homeData
    }
  }

  export default {
    components: {
    },
    setup
  }
</script>

<style scoped>

</style>
