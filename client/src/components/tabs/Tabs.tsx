/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {
  createContext,
  useContext,
  useMemo,
  useRef,
  useState,
  forwardRef,
  Ref,
  useEffect,
  ReactChildren,
} from 'react';

import { classNames, fadeIn, getNode } from '../../core/utils';

import './style.css';

export function getQueryParam(name: string, defaultValue: string) {
  const params = new URLSearchParams(window.location.search);
  return params[name] || defaultValue;
}

export function to(path: string, queries?: Record<string, string>) {
  const params = new URLSearchParams(window.location.search);
  if (queries) {
    Object.entries(queries).forEach(([k, v]) => {
      params.set(k, v);
    });
  }
  const paramsString = params.toString().length ? '?' + params.toString() : '';
  const url = `/${path}${paramsString}`;

  window.history.pushState(null, null, url);
}

export function updateQueryParam(name: string, value: string) {
  const params = new URLSearchParams(window.location.search);
  params[name] = value;
  const paramsString = params.toString();
  const url = `${window.location.pathname}?${paramsString}`;

  window.history.pushState(null, null, url);
}

export function useParam(paramName, initialValue) {
  const [param, setParam] = useState(() => getQueryParam(paramName, initialValue));

  const updateParam = (paramValue) => {
    setParam(paramValue);
    updateQueryParam(paramName, paramValue);
  };

  useEffect(() => {
    const handlePopState = () => {
      const paramValue = getQueryParam(paramName, initialValue);
      setParam(paramValue);
    };

    window.addEventListener('popstate', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [paramName, initialValue]);

  return [param, updateParam];
}

const TabContext = createContext(null);
const SelectableContext = createContext(null);

export const makeEventKey = (eventKey, href = null) => {
  if (eventKey != null) return String(eventKey);
  return href || null;
};

const TabContainer = ({ id, onSelect, activeKey, children, ...props }) => {
  const generateChildId = useMemo(
    () => (key: string, type: string) => (id ? `${id}-${type}-${key}` : null),
    [id],
  );

  const tabContext = useMemo(
    () => ({
      onSelect,
      activeKey,
      getControlledId: (key: string) => generateChildId(key, 'tabpanel'),
      getControllerId: (key: string) => generateChildId(key, 'tab'),
    }),
    [onSelect, activeKey, generateChildId],
  );

  return (
    <TabContext.Provider value={tabContext}>
      <SelectableContext.Provider value={onSelect}>{children}</SelectableContext.Provider>
    </TabContext.Provider>
  );
};

function useTabContext(props: any) {
  const context = useContext(TabContext);

  if (!context) return props;

  const { activeKey, getControlledId, getControllerId, onSelect, ...rest } = context;

  const { active, target } = props;

  const key = makeEventKey(target);

  return {
    ...rest,
    isActive: active == null && key != null ? makeEventKey(activeKey) === key : active,
    onSelect,
    panelID: getControlledId(target),
    tabID: getControllerId(target),
  };
}

/**
 * Navigation controllers for the Tabs component.
 */
export const TabItem = forwardRef<{}, any>(
  ({ target, children, disabled, ...props }, ref: Ref<any>) => {
    const { isActive, onSelect, panelID, tabID } = useTabContext({ target });

    function handleClick(event: any) {
      event.preventDefault();
      onSelect(target);
      to(target);
    }

    return (
      <a
        ref={ref}
        href={`#${panelID}`}
        role="tab"
        id={tabID}
        className={classNames('tab', props?.className, disabled && 'disabled')}
        aria-selected={isActive}
        onClick={handleClick}
      >
        {children}
      </a>
    );
  },
);

interface TabPanelProps {
  target: string;
  children: ReactChildren;
}
export const TabPanel = forwardRef<{}, TabPanelProps>(({ target, children }, ref: Ref<any>) => {
  const { isActive, panelID, tabID } = useTabContext({ target });

  if (!ref) {
    ref = React.createRef();
  }

  useEffect(() => {
    const el = getNode(ref);

    if (el) {
      (el as HTMLElement).style.opacity = '0';
      if (isActive) {
        fadeIn(el as HTMLElement);
      }
    }
  }, [isActive, ref]);

  return (
    <section
      ref={ref}
      role="tabpanel"
      id={panelID}
      aria-labelledby={tabID}
      className={classNames('tab-panel', isActive && 'active')}
    >
      {children}
    </section>
  );
});

/**
 * `Tab` is a phony wrapper component that we use to extract
 * props from and pass to the rendered `TabItem`s and `TabPanel`s.
 */
export const Tab = ({ target, title, children }) => {
  return null;
};

export const Tabs = forwardRef<{}, any>(
  ({ id, activeKey, onSelect, children, ...props }, ref: Ref<any>) => {
    return (
      <TabContainer ref={ref} id={id} onSelect={onSelect} activeKey={activeKey}>
        <nav className={classNames('tabs', props.className)} role="tablist">
          {children &&
            children.map((child) => {
              const { title, target, disabled, tabClassName } = child.props;
              return (
                <TabItem key={target} target={target} disabled={disabled} className={tabClassName}>
                  {title}
                </TabItem>
              );
            })}
        </nav>

        <div className="tab-content">
          {children &&
            children.map((child) => {
              const childProps = { ...child.props };
              ['title', 'disabled', 'tabClassName'].forEach((prop) => {
                delete childProps[prop];
              });
              const { target } = childProps;

              return <TabPanel key={target} {...childProps} />;
            })}
        </div>
      </TabContainer>
    );
  },
);
