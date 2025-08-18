import { call, fork, put, take } from 'redux-saga/effects';
import { graphqlClient } from '../graphqlClient';

export function* rootSaga() {
  console.log('hello from root saga!!!');
  // a non-blocking call that makes a certain saga watch for a specific action type
  yield fork(watchFetchTasks)
}
function* watchFetchTasks() {
  console.log('hello from watchFetchTasks fn!!!');
  while(true) {
    // engages a saga when a specific action type arrives
    yield take("FETCH_TASKS_STARTED");
    console.log('started!!!!');

    try {
    const getAllTasksQuery = `
	{
	tasks {
	id
	title
	description
	status
		}
	}
	`
  // call: creates an effect description that instructs the middleware to call fn with args
      const {data} = yield call(graphqlClient, {query: getAllTasksQuery})
  // put: dispatches an action
      yield put({
        type: "FETCH_TASKS_SUCCEEDED",
        payload: {
          tasks: data.tasks
        }
      })
    } catch(e) {
      yield put({
        type: 'FETCH_TASKS_FAILED',
        payload: {
          error: e.message
        }
      })
    }
  } 
}