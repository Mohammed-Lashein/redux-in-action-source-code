// under the hood, the store's getState() is called and its return value is passed as the 1st arg
//  to the reducer fn
// the 2nd arg is the action being dispatched
export function tasks(state = { tasks: [] }, action) {
	if (action.type === "FETCH_TASKS_SUCCEEDED") {
		return {
			tasks: action.payload.tasks,
		}
	}
	if (action.type === "CREATE_TASK_SUCCEEDED") {
		return { tasks: state.tasks.concat(action.payload) }
	}
	if (action.type === "EDIT_TASK") {
		const updatedTasks = state.tasks.map((task) => {
			if (task.id === action.payload.id) {
				return Object.assign({}, task, action.payload.params)
			}
			return task
		})
		console.log("the updatedTasks: ")
		console.log(updatedTasks)

		return {
			tasks: updatedTasks,
		}
	}

	return state
}
