import { graphqlClient } from "../graphqlClient"

export function fetchTasksSucceeded(tasks) {
	return {
		type: "FETCH_TASKS_SUCCEEDED",
		payload: {
			tasks,
		},
	}
}
export function fetchTasks() {
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
	return async (dispatch) => {
		const {
			data: { tasks },
		} = await graphqlClient({ query: getAllTasksQuery })
		// console.log("data coming from the client")
		// console.log(data);
		dispatch(fetchTasksSucceeded(tasks))
	}
}
