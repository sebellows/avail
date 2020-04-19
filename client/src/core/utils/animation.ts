export const onAnimationEnd = (el: HTMLElement, fn: Function): void => {
  const arr = ['webkitAnimationEnd', 'animationend'];
  const handler = (event) => {
    fn();
    arr.forEach((eventName) => {
      el.removeEventListener(eventName, handler, false);
    });
  };

  if (el && el.addEventListener) {
    arr.forEach((eventName) => {
      el.addEventListener(eventName, handler, false);
    });
  }
};
