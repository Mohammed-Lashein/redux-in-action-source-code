import { uniqueId } from "../actions"

const mockTasks = [
	{
		id: uniqueId(),
		title: "Learn Redux",
		description: "The store, actions, and reducers, oh my!",
		status: "Unstarted",
	},
	{
		id: uniqueId(),
		title: "Peace on Earth",
		description: "No big deal.",
		status: "In Progress",
	},
]

// under the hood, the store's getState() is called and its return value is passed as the 1st arg
//  to the reducer fn
// the 2nd arg is the action being dispatched
export function tasks(state = { tasks: mockTasks }, action) {
	if (action.type === "CREATE_TASK") {
		return { tasks: state.tasks.concat(action.payload) }
	}
	if (action.type === "EDIT_TASK") {
		const updatedTasks = state.tasks.map((task) => {
			if (task.id === action.payload.id) {
				return Object.assign({}, task, action.payload.params)
			}
			return task
		})
		console.log(updatedTasks)

		return {
			tasks: updatedTasks,
		}
	}

	return state
}
