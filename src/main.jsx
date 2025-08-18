import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import App from "./App.jsx"
import { createStore, applyMiddleware } from "redux"
import { tasksReducer } from "./reducers"
import { Provider } from "react-redux"
import { composeWithDevTools } from "@redux-devtools/extension"
import { thunk } from "redux-thunk"
import createSagaMiddleware from 'redux-saga'
import { rootSaga } from './sagas/index.js'

function rootReducer(state = {}, action) {
	return {
		tasks: tasksReducer(state.tasks, action),
	}
}
const sagaMiddleware = createSagaMiddleware()
// prettier-ignore to follow the docs format for the code
const store = createStore(
	rootReducer,
	composeWithDevTools(applyMiddleware(sagaMiddleware, thunk))
	/* 
		In the docs they are writing it like so :  applyMiddleware(...middleware),
		but my intuition was correct that this syntax will throw reference error 'middleware' is not defined
	*/
)
sagaMiddleware.run(rootSaga)

createRoot(document.getElementById("root")).render(
	<StrictMode>
		<Provider store={store}>
			<App />
		</Provider>
	</StrictMode>
)
