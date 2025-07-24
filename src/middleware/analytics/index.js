export let analytics = store => next => action =>{

  if(!action || !action.meta || !action.meta.analytics) {
    return next(action)
  }
  
  const {event, data} = action.meta.analytics
  fakeAnalyticsApi(event, data)
  .then((res) => {console.log("Recorded: ", event, data)})
  .catch((err) => console.log(err)
  )

  /* 
    The below code is not working, and I wondered why.
    I thought that the store had a state format different from what I remember, so I logged it, but it was the structure I expected.

    It took me some time to know why the task is undefined.

    Do you remember that we are in middleware?
    If yes, then remember that the middleware sits between the action being dispatched and the store passing the action to the reducer.

    So when we access the task id here, it hasn't actually been added to the store's state yet since
    the reducer hasn't read the action type yet.

    So the image in the book is a bit misleading.
    We can make a call to the backend in the form of a query to get the task content, but I think it is
    an overwork for no seen benefit
  */

  // console.log('this is the store state');
  // console.log(store.getState());
  // const task = (store.getState()).tasks.tasks.find((task) => task.id === action.payload.id)
  // console.log(task);
  return next(action)
}
function fakeAnalyticsApi(eventName, data) {
  return new Promise((resolve, reject) => {
    resolve("Success!")
  })
}