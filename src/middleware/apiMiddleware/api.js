import { toast } from 'sonner'
import { graphqlClient } from "../../graphqlClient"

// This is an action
export const CALL_API = "Call Api"

export const apiMiddleware = (store) => (next) => async (action) => {
	const callApi = action[CALL_API]
	if (typeof callApi === "undefined") {
		return next(action)
	}

	const { query, variables } = callApi
	const [requestStartedType, successType, failureType] = callApi.types
	next({ type: requestStartedType })

	const { data, error } = await graphqlClient({ query, variables })

	if (error) {
		return next({
			type: failureType,
			error: error.message,
		})
	}

	if (data) {
		if (data.createTask) {
			toast.success(data.createTask.message)
		}
		if (data.updateTaskStatus) {
			/* 
				This condition was meant to be used to just display sonner message, but on migrating to using the
				middleware, I was faced with the tough choice where either I pass a generic response to the reducer
				then I clutter it with extracting data, or I follow the action creators pattern where the they are 
				responsible for passing direct data to the reducer.

				I chose to stick to the 2nd option, since the middleware is responsible for the job of modifying the data to suit reducers needs.
			*/
			toast.success(data.updateTaskStatus.message)
			return next({
				type: successType,
				payload: {
					id: data.updateTaskStatus.task.id,
					params: {
						status: data.updateTaskStatus.task.status,
					},
				},
			})
		}
		return next({
			type: successType,
			payload: data,
		})
	}
}
