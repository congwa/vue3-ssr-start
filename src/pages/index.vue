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
    const request = useRequest()
    const { setSEO, setSMO } = useSXO()

    if (!syncState.homeData) {
      syncState.homeData = await Promise.resolve({ host: host.value, abc: 'helloWord' }) // mock
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
