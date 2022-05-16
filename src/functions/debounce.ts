export const debounce = (fn: (...args: any) => any, ms = 0) => {
  let timeoutId: any;
  return function (this: any, ...args: any) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn.apply(this, args), ms);
  };
};
