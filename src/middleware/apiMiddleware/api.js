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
		return next({
			type: successType,
			payload: data,
		})
	}
}
