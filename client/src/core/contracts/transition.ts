import {
  EndHandler,
  EnterHandler,
  ExitHandler,
  TransitionChildren,
} from 'react-transition-group/Transition';

/**
 * `react-transition-group` type definitions do not export their prop types as an
 * interface, instead `TransitionProps` is a type only. This makes it difficult to
 * extend component interfaces to use their predefined prop types.
 */
export interface TransitionProps<E extends HTMLElement> {
  /**
   * Show the component; triggers the enter or exit states
   */
  in?: boolean;

  /**
   * By default the child component is mounted immediately along with the
   * parent Transition component. If you want to "lazy mount" the component on
   * the first `in={true}` you can set `mountOnEnter`. After the first enter
   * transition the component will stay mounted, even on "exited", unless you
   * also specify `unmountOnExit`.
   */
  mountOnEnter?: boolean;

  /**
   * By default the child component stays mounted after it reaches the
   * 'exited' state. Set `unmountOnExit` if you'd prefer to unmount the
   * component after it finishes exiting.
   */
  unmountOnExit?: boolean;

  /**
   * Callback fired before the "entering" status is applied. An extra
   * parameter `isAppearing` is supplied to indicate if the enter stage is
   * occurring on the initial mount
   */
  onEnter?: EnterHandler<E>;

  /**
   * Callback fired after the "entering" status is applied. An extra parameter
   * isAppearing is supplied to indicate if the enter stage is occurring on
   * the initial mount
   */
  onEntering?: EnterHandler<E>;

  /**
   * Callback fired after the "entered" status is applied. An extra parameter
   * isAppearing is supplied to indicate if the enter stage is occurring on
   * the initial mount
   */
  onEntered?: EnterHandler<E>;

  /**
   * Callback fired before the "exiting" status is applied.
   */
  onExit?: ExitHandler<E>;

  /**
   * Callback fired after the "exiting" status is applied.
   */
  onExiting?: ExitHandler<E>;

  /**
   * Callback fired after the "exited" status is applied.
   */
  onExited?: ExitHandler<E>;

  /**
   * A function child can be used instead of a React element. This function is
   * called with the current transition status ('entering', 'entered',
   * 'exiting',  'exited', 'unmounted'), which can be used to apply context
   * specific props to a component.
   * ```jsx
   *    <Transition in={this.state.in} timeout={150}>
   *        {state => (
   *            <MyComponent className={`fade fade-${state}`} />
   *        )}
   *    </Transition>
   * ```
   */
  children?: TransitionChildren;

  /**
   * The duration of the transition, in milliseconds. Required unless addEndListener is provided.
   *
   * You may specify a single timeout for all transitions:
   * ```js
   *   timeout={500}
   * ```
   * or individually:
   * ```js
   * timeout={{
   *  appear: 500,
   *  enter: 300,
   *  exit: 500,
   * }}
   * ```
   * - appear defaults to the value of `enter`
   * - enter defaults to `0`
   * - exit defaults to `0`
   */
  timeout?: number | { appear?: number; enter?: number; exit?: number };

  /**
   * Add a custom transition end trigger. Called with the transitioning DOM
   * node and a done callback. Allows for more fine grained transition end
   * logic. Note: Timeouts are still used as a fallback if provided.
   */
  addEndListener?: EndHandler<E>;

  [prop: string]: any;
}
