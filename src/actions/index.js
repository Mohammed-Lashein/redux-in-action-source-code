import { toast } from "sonner"
import { graphqlClient } from "../graphqlClient"
import { CALL_API } from '../middleware/apiMiddleware/api'


// I don't know why we are exporting these action types -- where will we use them?
export const FETCH_TASKS_STARTED = 'FETCH_TASKS_STARTED'
export const FETCH_TASKS_SUCCEEDED = 'FETCH_TASKS_SUCCEEDED'
export const FETCH_TASKS_FAILED = 'FETCH_TASKS_FAILED'


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
	return {
		[CALL_API]: {
			types: [FETCH_TASKS_STARTED, FETCH_TASKS_SUCCEEDED, FETCH_TASKS_FAILED],
			query: getAllTasksQuery,
			variables: {}
		}
	}
}
/* 
	Even though our reducer handles only CREATE_TASK_SUCCEEDED, we need to provide the 3 states in order
	for our generic middleware to stay working
*/
export const CREATE_TASK_STARTED = 'CREATE_TASK_STARTED'
export const CREATE_TASK_SUCCEEDED = 'CREATE_TASK_SUCCEEDED'
export const CREATE_TASK_FAILED = 'CREATE_TASK_FAILED'

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

	return {
		[CALL_API]: {
			types: [CREATE_TASK_STARTED , CREATE_TASK_SUCCEEDED, CREATE_TASK_FAILED],
			query: createTaskQuery,
			variables
		}
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

export const EDIT_TASK_STARTED = 'EDIT_TASK_STARTED'
export const EDIT_TASK_SUCCEEDED = 'EDIT_TASK_SUCCEEDED'
export const EDIT_TASK_FAILED = 'EDIT_TASK_FAILED'

export function editTaskUsingMiddleWare(id, params = {}) {
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

	return {
		[CALL_API]: {
			types: [EDIT_TASK_STARTED, EDIT_TASK_SUCCEEDED, EDIT_TASK_FAILED],
			query: updateTaskStatusMutation,
			variables
		}
	}
}	