import { styles } from "./styles";

const isDOM = typeof document !== 'undefined';

function NoScrollController() {
  if (!isDOM) return;

  let isOn = false;
  let scrollbarSize: number;
  let scrollTop: number;

  const doc = document.documentElement;
  const body = document.body;

  function getScrollbarSize() {
    if (scrollbarSize != null) return scrollbarSize;

    const fauxScroller = document.createElement('div');
    fauxScroller.style.cssText = styles({
      width: '99px',
      height: '99px',
      position: 'absolute',
      top: '-9999px',
      overflow: 'scroll',
    });

    doc.appendChild(fauxScroller);

    scrollbarSize = fauxScroller.offsetWidth - fauxScroller.clientWidth;

    doc.removeChild(fauxScroller);

    return scrollbarSize;
  }

  function hasScrollbar() {
    return doc.scrollHeight > window.innerHeight;
  }

  return {
    on: function () {
      scrollTop = window.pageYOffset;

      body.style.cssText = styles({
        width: hasScrollbar() ? `calc(100% - ${getScrollbarSize()}px)` : '100%',
        position: 'fixed',
        top: `-${scrollTop}px`,
        overflow: 'hidden',
      });

      isOn = true;
    },
    off: function () {
      if (!isOn) return;

      body.style.cssText = styles({
        width: null,
        position: null,
        top: null,
        overflow: null,
      });
      window.scroll(0, scrollTop);
      isOn = false;
    },
    toggle: function () {
      if (isOn) {
        this.off();
        return;
      }
      this.on();
    },
  };
}

export const noScroll = NoScrollController();
