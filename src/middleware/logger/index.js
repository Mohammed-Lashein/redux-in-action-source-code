export const logger = store => next => action => {
  console.group(action.type)
  console.log('dispatching: ', action);

  const resultOfTheDispatchedAction = next(action)
  console.log('next state', store.getState());
  console.groupEnd()

  return resultOfTheDispatchedAction
}