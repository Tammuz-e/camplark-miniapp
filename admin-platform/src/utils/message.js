import { Message } from '@arco-design/web-vue'

export default {
  success: (msg) => Message.success(msg),
  error: (msg) => Message.error(msg),
  warning: (msg) => Message.warning(msg),
  info: (msg) => Message.info(msg)
}
