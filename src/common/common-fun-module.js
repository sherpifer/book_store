import { Indicator } from 'mint-ui'

export default {
  showLoading() {
    Indicator.open()
  },
  hideLoading() {
    Indicator.close()
  }
}