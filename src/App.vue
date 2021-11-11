<template>
  <RouterView v-slot="{ Component }">
    <Suspense>
      <component :is="Component" />
    </Suspense>
  </RouterView>
</template>

<style>
#app {
  min-height: 100%;
  display: flex;
  flex-direction: column;
}

.body-center {
  flex: 1;
}
</style>
