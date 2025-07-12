export const logger = store => next => action => {
  console.group(action.type)
  console.log('dispatching: ', action);

  const resultOfTheDispatchedAction = next(action)
  console.log('next state', store.getState());
  console.groupEnd()
  /* 
  Why do we need to return next(action) from the middleware ?
  In order for the middleware chain to work.
  After logging the return value of next(action), it printed out the action object of each action type
  */
  // console.log(resultOfTheDispatchedAction);
  
  return resultOfTheDispatchedAction
}