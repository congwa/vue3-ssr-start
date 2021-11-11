import { computed, reactive, toRefs, inject } from 'vue'

const key = Symbol('session')

export function useSession () {
  return inject(key)
}

const defaultContext = {
  host: '',
  token: '',
  UUID: '',
  ua: '',
  resetToken: token => {}
}
export function createSession (app, context = defaultContext) {
  const platform = /mobile/.test(context.ua.toLowerCase()) ? 'M' : 'PC'
  const session = reactive({
    token: context.token || '',
    UUID: context.UUID || '',
    host: context.host,
    platform,
    userProfile: {}
  })

  const isLogin = computed(() => !!session.token)

  function setToken (token = '') {
    session.token = token
    context.resetToken(token)
  }

  async function setUserProfile (newData, request) {
    if (newData) {
      session.userProfile = Object.assign(session.userProfile, newData)
      return
    }
    // 如果没有userId，认为这个token就是无效的，要清除
    setToken('')
  }

  const sessionState = {
    ...toRefs(session),
    isLogin,
    setToken,
    setUserProfile
  }

  app.provide(key, sessionState)
  return sessionState
}
