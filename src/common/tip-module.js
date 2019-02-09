import { Toast } from 'mint-ui'
import { MessageBox, Indicator } from 'mint-ui'

const tipModule = {
  showToast(msg, duration) {
    Toast({
      message: msg,
      duration: duration || 2500
    })
  },
  showToastWithIcon(msg, icon, duration) {
    Toast({
      message: msg,
      duration: duration || 2500,
      iconClass: icon
    })
  },
  showAlert(msg, callback) {
    MessageBox.alert(msg).then(action => {
      callback && callback()
    })
  },
  showConfirm(msg, resolve, reject) {
    MessageBox.confirm(msg).then(action => {
      resolve()
    }, cancel => {
      reject && reject()
    })
  },
  showLoading() {
    this.$Indicator.open()
  },
  hideLoading() {
    this.$Indicator.close()
  }
}

export default tipModule