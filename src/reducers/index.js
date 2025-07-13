const initialState = {
	tasks: [],
	isLoading: false,
	error: null
}

// under the hood, the store's getState() is called and its return value is passed as the 1st arg
//  to the ROOT reducer fn not the slices reducers 
// the 2nd arg is the action being dispatched
export function tasksReducer(state = initialState, action) {
	if(action.type === 'FETCH_TASKS_STARTED') {
		return {
			...state,
			isLoading: true
		}
	}
	if (action.type === "FETCH_TASKS_SUCCEEDED") {
		return {
			// no longer the case since we are using the middleware now 
			// tasks: action.payload.tasks,
			...state,
			tasks: action.payload,
			isLoading: false,
		}
	}
	if(action.type === "FETCH_TASKS_FAILED") {
		return {
			...state,
			// we need to set isLoading to false because FETCH_TASKS_STARTED sets
			// it to true and we want to pass the condition in the TasksPage component
			// that returns a loading indicator in order for us to be able to show
			// the ErrorFlashMessage component along with the headers of the 
			// kanban board
			isLoading: false,
			error: action.payload.errorMessage
		}
	}
	if (action.type === "CREATE_TASK_SUCCEEDED") {
		return { tasks: state.tasks.concat(action.payload) }
	}
	if (action.type === "EDIT_TASK_SUCCEEDED") {
		const taskToUpdate = state.tasks.find((task) => task.id === action.payload.id)
		const tasksWithoutTaskToUpdate = state.tasks.filter((task) => task.id !== taskToUpdate.id)

		let taskToUpdateWithUpdatedData = Object.assign({}, taskToUpdate, action.payload.params)
		return {
			tasks: [...tasksWithoutTaskToUpdate, taskToUpdateWithUpdatedData]
		}
	}

	return state
}
