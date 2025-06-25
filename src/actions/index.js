import { graphqlClient } from "../graphqlClient"

// server action -- initiated by the server
export function fetchTasksSucceeded(tasks) {
	return {
		type: "FETCH_TASKS_SUCCEEDED",
		payload: {
			tasks,
		},
	}
}
// view action -- initiated by the client
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
export function editTask(id, params = {}) {
	return {
		type: "UPDATE_TASK_STATUS",
		type: "EDIT_TASK",
		payload: {
			id,
			newStatus,
			params,
		},
	}
}
export function createTask({ title, description }) {
	return {
		type: "CREATE_TASK",
		payload: {
			id: uniqueId(),
			title,
			description,
			status: "Unstarted",
		},
	}
}
