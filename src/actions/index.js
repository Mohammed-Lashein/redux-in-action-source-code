import { toast } from "sonner"
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
		const { data, error } = await graphqlClient({ query: getAllTasksQuery })
		console.log("data coming from the client")
		console.log(data)
		if (data) {
			dispatch(fetchTasksSucceeded(data.tasks))
		}
		if (error) {
			console.log(error)
		}
	}
}
export function createTaskSucceeded({ title, description, id }) {
	return {
		type: "CREATE_TASK_SUCCEEDED",
		payload: {
			id,
			title,
			description,
			// You can use the value returned from the query.
			// I wrote the value manually as it is less likely to change
			status: "Unstarted",
		},
	}
}
export function createTask({ title, description }) {
	const createTaskQuery = `
	mutation CREATE_TASK($newTaskDetails: TaskInput) {
		createTask(newTaskDetails: $newTaskDetails) {
			code
			success
			message
			task {
			id
			title
			description
			status
			}
		}
	}
	`
	const variables = {
		newTaskDetails: {
			title,
			description,
			status: "Unstarted",
		}
	}
	return async (dispatch) => {
		const { data, error } = await graphqlClient({ query: createTaskQuery, variables })

		if (error) {
			console.log(error)
			return
		}
		dispatch(createTaskSucceeded(data.createTask.task))
		toast.success(data.createTask.message)
	}
}

export function editTaskSucceeded(id, params = {}) {
	return {
		type: "EDIT_TASK_SUCCEEDED",
		payload: {
			id,
			params,
		},
	}
}
export function editTask(id, params = {}) {
	const updateTaskStatusMutation = `
	mutation UPDATE_TASK_STATUS($taskId: ID, $newStatus: String) {
		updateTaskStatus(id: $taskId, status: $newStatus) {
			code
			success
			message
			task {
			id
			title
			description
			status
			}
		}
	}
	`
	const variables = {
		taskId: id,
		newStatus: params.status,
	}
	return async (dispatch) => {
		const {data, error} = await graphqlClient({query: updateTaskStatusMutation, variables})
		console.log('data coming from updateTaskStatus mutation');
		console.log(data);
		
		if(error) {
			console.log(error);
			// add a toast for errors!
			return
		}
		dispatch(editTaskSucceeded(data.updateTaskStatus.task.id, {status: data.updateTaskStatus.task.status}))
		toast.success(data.updateTaskStatus.message)
	}
}
