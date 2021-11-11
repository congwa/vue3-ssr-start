import { watch, onMounted } from 'vue'
import { INTERACT_MSG_TYPE, useInteract, useSession } from '../hooks/app'
import { Toast, Dialog } from 'vant'

function showToast (platform, content, type, duration) {
  switch (type) {
    case INTERACT_MSG_TYPE.INFO:
      platform === 'PC'
        ? Toast({ message: content, duration })
        : Toast({ message: content, duration })
      break
    case INTERACT_MSG_TYPE.SUCCESS:
      platform === 'PC'
        ? Toast({ type: 'success', message: content, duration })
        : Toast({ type: 'success', message: content, duration })
      break
    case INTERACT_MSG_TYPE.WARNING:
      platform === 'PC'
        ? Toast({ type: 'fail', message: content, duration })
        : Toast({ type: 'fail', message: content, duration })
      break
    case INTERACT_MSG_TYPE.ERROR:
      platform === 'PC'
        ? Toast({ type: 'fail', message: content, duration })
        : Toast({ type: 'fail', message: content, duration })
      break
  }
}

function showModal (platform, title, content, type) {
  if (platform === 'PC') {
    Dialog.alert({ title, message: content, theme: 'round-button', confirmButtonText: type === INTERACT_MSG_TYPE.ERROR ? '真遗憾' : '好的' })
  } else {
    Dialog.alert({ title, message: content, theme: 'round-button', confirmButtonText: type === INTERACT_MSG_TYPE.ERROR ? '真遗憾' : '好的' })
  }
}

export default function interactImplement (progressBarRef) {
  const { interactState } = useInteract()
  const { platform } = useSession()

  Toast.allowMultiple()
  let loadingToast = null
  onMounted(() => {
    watch(() => interactState.progressing, (val) => {
      if (val) {
        progressBarRef.value.start()
      } else {
        progressBarRef.value.end()
      }
    })

    watch(() => interactState.loadingOption, ({ show, text }) => {
      if (show) {
        loadingToast = Toast.loading({
          duration: 0,
          forbidClick: true,
          message: text,
          position: platform.value === 'PC' ? 'top' : 'middle'
        })
      } else {
        loadingToast && loadingToast.clear()
      }
    })

    watch(() => interactState.toastOption, ({ content, type, duration }) => {
      showToast(platform.value, content, type, duration)
    })

    watch(() => interactState.modalOption, ({ title, content, type }) => {
      showModal(platform.value, title, content, type)
    })

    watch(() => interactState.confirmOption, ({ type, title, content, showCancelButton, cancelButtonText, confirmButtonText, resolveConfirm, resolveCancel }) => {
      // todo 根据type来渲染icon
      if (platform.value === 'PC') {
        Dialog.confirm({
          title: title,
          message: content,
          showCancelButton: showCancelButton,
          confirmButtonText,
          cancelButtonText,
          theme: 'round'
        }).then(() => {
          resolveConfirm && resolveConfirm()
        }).catch(() => {
          resolveCancel && resolveCancel()
        })
      } else {
        Dialog.confirm({
          title: title,
          message: content,
          showCancelButton: showCancelButton,
          confirmButtonText,
          cancelButtonText,
          theme: 'round'
        }).then(() => {
          resolveConfirm && resolveConfirm()
        }).catch(() => {
          resolveCancel && resolveCancel()
        })
      }
    })
  })
}
