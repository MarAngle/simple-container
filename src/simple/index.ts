import { reactive } from 'vue'
import { Modal, ModalProps, notification } from 'ant-design-vue'
import { NotificationArgsProps } from 'ant-design-vue/lib/notification'
import { setEnv } from 'complex-utils'
import { install } from 'complex-plugin'
import { Data } from 'complex-data'
import { noticeMsgType } from 'complex-plugin/src/notice'
import '@/modules/complex-component-antd/init'

setEnv(process.env.NODE_ENV)
setEnv(process.env.NODE_ENV, 'real')

Data.$format = function(data) {
  return reactive(data)
}

install({
  notice: {
    showMsg: function (content: string, type: noticeMsgType = 'info', title = '通知', duration = 3) {
      this.setMsg({
        message: title,
        description: content,
        duration: duration
      }, type)
    },
    setMsg: function (option: NotificationArgsProps, type: noticeMsgType = 'info') {
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
        onOk: function () {
          if (next) {
            next('ok')
          }
        }
      }, 'warning')
    },
    _alert: function (content: string, title = '警告', next?: (act: string) => void, okText = '确认') {
      const modal = this.setModal({
        title: title,
        content: content,
        okText: okText,
        onOk: function () {
          console.log(modal)
          if (next) {
            next('ok')
          }
          // modal.destroy()
          return Promise.resolve()
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
          console.log(close)
          if (next) {
            next('cancel')
          }
          close()
        },
        onOk: function (close: () => void) {
          console.log(close)
          if (next) {
            next('ok')
          }
          close()
        }
      }, 'confirm')
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
