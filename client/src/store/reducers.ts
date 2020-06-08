/* eslint-disable @typescript-eslint/no-unused-vars */
import { AvailState, StateActionConfig, AvailSetting, AvailUtility } from '../core/contracts';
import { addItem, removeItem, setInProgress, setConfig } from './actions';
import { ADD_ITEM, REMOVE_ITEM, SET_IN_PROGRESS, SET_CONFIG } from './types';

// const reducer = (state, action) => {
//   const { payload } = action;
//   switch (action.type) {
//     case "ADD_ITEM":
//      return addNewItem(state, payload.todoItem);
//     default:
//      return state;
// }};
// function addNewItem(state, task) {
//   const list = [...state.list];
//   const newItem = {
//     itemId: list.length + 1,
//     task: task,
//     completed: false
//   };
//   return {
//     list: [...state.list, newItem]
//   };
// }

type StateConfigType = AvailSetting | AvailUtility;

export function stateReducer<T = StateConfigType>(
  state: AvailState<T>,
  action: Partial<StateActionConfig>,
) {
  switch (action.type) {
    case SET_CONFIG:
      return setConfig(state, action.config);
    case ADD_ITEM:
      return addItem(state, action.config);
    case REMOVE_ITEM:
      return removeItem(state, action.config);
    case SET_IN_PROGRESS:
      return setInProgress(state, action.inProgress);
    default:
      return state;
  }
}
