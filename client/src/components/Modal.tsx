/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {
  forwardRef,
  Ref,
  useContext,
  useEffect,
  useState,
  useRef,
  CSSProperties,
} from 'react';
import { createPortal } from 'react-dom';
import { Transition } from 'react-transition-group';
import { classNames } from '../core/utils';
import { CloseIcon } from './Icon';
import { TransitionProps } from '../core/contracts';
import '../styles/modal.css';

export const ModalContext = React.createContext({ onHide() {} });

// These two containers are siblings in the DOM
const modalRoot = document.getElementById('portal');

const transitionState = {
  exited: 'is-collapsed',
  exiting: 'is-collapsing',
  entering: 'is-expanding',
  entered: 'is-expanded',
};

interface ModalSharedProps {
  className?: string;
  isOpen?: boolean;
}

interface DialogProps {
  className?: string;
  children?: any;
  style?: CSSProperties;
  title?: string;
  width?: string;
  onClose?: (event: React.SyntheticEvent) => void;
}

const noopEvent = (event: React.SyntheticEvent) => {};

export const DialogHeader: React.FC<Omit<DialogProps, 'children' | 'width'>> = ({
  className = null,
  title = '',
  onClose = noopEvent,
}) => {
  function handleClick(event: React.SyntheticEvent) {
    event.preventDefault();
    onClose(event);
  }

  return (
    <div className={classNames('dialog-header', className)}>
      <h5 className="dialog-title">{title}</h5>
      <button type="button" className="close" aria-label="Close" onClick={handleClick}>
        <span className="sr-only">Close</span>
        <CloseIcon aria-hidden="true" />
      </button>
    </div>
  );
};

// interface ModalContainerProps extends TransitionProps {

// }

// Let's create a Modal component that is an abstraction around
// the portal API.
// export const ModalContainer = forwardRef<Transition, TransitionProps>(
//   (
//     {
//       in: inProp = false,
//       appear = false,
//       className = '',
//       children,
//       timeout = 300,
//       dimension = 'height',
//       role = 'dialog',
//       show: initialShow = false,
//       onEnter,
//       onEntering,
//       onEntered,
//       onExit,
//       onExiting,
//       onExited,
//       onShow,
//       onHide,
//       ...props
//     },
//     ref: Ref<Transition>,
//   ) => {
//   const [showModal, setShowModal] = useState(initialShow);

//   const container = useRef(null);

//   useEffect(() => {
//     container.current = document.createElement('div');
//     // Append the element into the DOM on mount. We'll render
//     // into the modal container element (see the HTML tab).
//     modalRoot.appendChild(container.current);

//     return () => {
//       // Remove the element from the DOM when we unmount
//       modalRoot.removeChild(container.current);
//     }
//   }, []);

//   useEffect(() => {
//     if (!show || !container) return;

//     handleShow();
//   }, [show, container, /* should never change: */ handleShow]);

//   // Hide cleanup logic when:
//   //  - `exited` switches to true
//   //  - component unmounts;
//   useEffect(() => {
//     if (!exited) return;

//     handleHide();
//   }, [exited, handleHide]);

//   function handleEnter(node, ...args) {
//     if (node) {
//       node.style.display = 'block';
//       // updateDialogStyle(node);
//     }

//     if (props.onEnter) props.onEnter(node, ...args);
//   };

//   function handleEntering(node, ...args) {
//     if (props.onEntering) props.onEntering(node, ...args);

//     // FIXME: This should work even when animation is disabled.
//     addEventListener(window, 'resize', handleWindowResize);
//   }

//   function handleExited(node, ...args) {
//     if (node) node.style.display = ''; // RHL removes it sometimes
//     if (props.onExited) props.onExited(...args);

//     // FIXME: This should work even when animation is disabled.
//     removeEventListener(window, 'resize', handleWindowResize);
//   }

//   function handleWindowResize() {
//     // updateDialogStyle(_modal.dialog);
//   }

//   // Use a portal to render the children into the element
//   return createPortal(
//     // Any valid React child: JSX, strings, arrays, etc.
//     children,
//     // A DOM element
//     container.current,
//   );
// })

export const Dialog: React.FC<DialogProps> = ({ className = '', width = '500px', children }) => {
  return (
    <div role="document" className={classNames('dialog', className)} style={{ maxWidth: width }}>
      {children}
    </div>
  );
};

interface ModalProps extends ModalSharedProps, TransitionProps {
  ariaLabelledby?: string;
}

interface ModalContainerProps {
  style?: CSSProperties;
}
export const ModalContainer: React.FC<ModalContainerProps> = ({ style = {} }) => {
  const modalStyles = { paddingRight: '15px', ...style };
  return <div className="modal" role="dialog" style={modalStyles}></div>;
};

// The Modal component is a normal React component, so we can
// render it wherever we like without needing to know that it's
// implemented with portals.
export const Modal: React.FC<ModalProps> = ({
  ariaLabelledby = '',
  className = null,
  isOpen = false,
  children,
}) => {
  //   const [showModal, setShowModal] = useState(initialShow);

  // Container element to which the modal will be rendered
  const el = document.createElement('div');
  const container = useRef(el);
  const labelledbyRef = useRef(ariaLabelledby);

  useEffect(() => {
    const { current: currentContainer } = container;

    // Append to root when the children of Modal are mounted
    modalRoot.appendChild(currentContainer);

    // Do cleanup on componentWillUnmount
    return () => {
      modalRoot.removeChild(currentContainer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    isOpen &&
    createPortal(
      <div
        className="modal"
        role="dialog"
        style={{ paddingRight: '15px', display: isOpen ? 'block' : 'none' }}
      >
        <Dialog>{children}</Dialog>
      </div>, // child element
      container.current, // target container
    )
  );
};
