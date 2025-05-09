import { uniqueId } from '../actions'

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


export function tasks(state = {tasks: mockTasks}, action) {
  return state
}