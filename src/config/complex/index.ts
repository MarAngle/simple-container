import { App, reactive } from 'vue'
import { Modal, ModalProps, notification } from 'ant-design-vue'
import { NotificationArgsProps } from 'ant-design-vue/lib/notification'
import { getEnv, setEnv } from 'complex-utils'
import { install } from 'complex-plugin'
import { Data } from 'complex-data'
import { messageType } from 'complex-plugin/src/notice'
import complexComponentAntd from '@/modules/complex-component-antd'
import config from '@/modules/complex-component-antd/config'
import pluginLayout from './pluginLayout'

setEnv('data', import.meta.env.VITE_APP_ENV)
setEnv('real', import.meta.env.VITE_APP_ENV)

config.search.inline = true
// config.modal.destroyOnClose = false

Data.$format = function(data, formatConfig) {
  if (formatConfig && formatConfig.recommend) {
    return reactive(data) as Data
  } else {
    return data
  }
}

export const initComplex = function(app: App) {
  app.use(complexComponentAntd, {
    pluginLayout: pluginLayout
  })
  install({
    notice: {
      message: function (content: string, type: messageType = 'info', title = '通知', duration = 3) {
        this.setMsg({
          message: title,
          description: content,
          duration: duration
        }, type)
      },
      setMsg: function (option: NotificationArgsProps, type: messageType = 'info') {
        if (notification[type]) {
          notification[type](option)
        } else {
          // eslint-disable-next-line no-console
          console.error('notification type is not defined, type reset open')
          notification.open(option)
        }
      },
      alert: function (content: string, title = '警告', next?: (act: string) => void, okText = '确认') {
        this.setModal({
          title: title,
          content: content,
          okText: okText,
          onOk: function (close: () => void) {
            if (next) {
              next('ok')
            }
            close()
          }
        }, 'warning')
      },
      confirm: function (content: string, title = '警告', next?: (act: string) => void, okText = '确认', cancelText = '取消') {
        this.setModal({
          title: title,
          content: content,
          okText: okText,
          cancelText: cancelText,
          onCancel: function (close: () => void) {
            if (next) {
              next('cancel')
            }
            close()
          },
          onOk: function (close: () => void) {
            if (next) {
              next('ok')
            }
            close()
          }
        }, 'confirm')
      },
      debugConfirm(option) {
        this.$debugConfirm(getEnv('real') === 'development', (getEnv('debug') || 0) as number, option)
      },
      setModal: function (option: ModalProps, type = 'info') {
        if (Modal[type]) {
          return Modal[type](option)
        } else {
          // eslint-disable-next-line no-console
          console.error('modal type is not defined, type reset info')
          return Modal.info(option)
        }
      }
    }
  })

}

