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
		/* 
			Instead of modifying the database and asking the backend to add a table in the db, I will manually add
			the timer property here
		*/
		const tasksWithTimerPropertyAdded = action.payload.tasks.map((task) =>  ({...task, timer: 0}))
		
		return {
			tasks: tasksWithTimerPropertyAdded,
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
	if(action.type === 'TIMER_INCREMENT') {
		const updatedTasks = state.tasks.map((task) => {

			if(task.id === action.payload.taskId) {
				return {
					...task, // spread the object to ensure that we get a new copy of the obj and not mutate the one 
					// we are looping on
					timer: task.timer + 1
				}
			}
			return task
		})
		return {
			tasks: updatedTasks
		}
	}
	return state
}
