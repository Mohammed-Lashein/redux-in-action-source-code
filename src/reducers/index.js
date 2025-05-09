const mockTasks = [
	{
		id: 1,
		title: "Learn Redux",
		description: "The store, actions, and reducers, oh my!",
		status: "Unstarted",
	},
	{
		id: 2,
		title: "Peace on Earth",
		description: "No big deal.",
		status: "In Progress",
	},
]


export function tasks(state = {tasks: mockTasks}, action) {
  return state
}