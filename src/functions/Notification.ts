import Vue from "vue";

/* eslint-disable @typescript-eslint/no-explicit-any */
interface NotificationParams {
  title?: string;
  text?: string;
  position?: string;
  color?: string;
  border?: string;
  icon?: string;
  duration?: number | string;
  onClick?: any;
  buttonClose?: boolean;
  flat?: boolean;
  onDestroy?: any;
  sticky?: boolean;
  square?: boolean;
  width?: string;
  loading?: boolean;
  progress?: any;
  notPadding?: any;
  content?: any;
  clickClose?: boolean;
  classNotification?: string;
}
/* eslint-enable */

interface Notification {
  (p: NotificationParams): void;
  error: (p: NotificationParams) => void;
}

const notification: Notification = (...x) => Vue.prototype.$vs.notification(...x);
notification.error = (params: NotificationParams) =>
  notification({
    color: "danger",
    position: "top-left",
    ...params,
  });

export { notification };
