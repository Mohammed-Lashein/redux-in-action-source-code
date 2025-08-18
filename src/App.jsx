import { connect } from "react-redux"
import "./App.css"
import TasksPage from "./components/TasksPage.jsx"
import { Component } from "react"
import { createTask, editTask, fetchTasks } from "./actions/index.js"
import { Toaster } from "sonner"

class App extends Component {
	componentDidMount() {
		// this.props.dispatch(fetchTasks())
		this.props.dispatch({type: "FETCH_TASKS_STARTED"})
	}
	onCreateTask = ({ title, description }) => {
		this.props.dispatch(createTask({ title, description }))
	}
	onTaskStatusChange = (id, { status }) => {
		this.props.dispatch(editTask(id, { status }))
	}
	render() {
		return (
			<div className='main-content'>
				<Toaster
					richColors
					position='top-right'
				/>
				<TasksPage
					tasks={this.props.tasks}
					onCreateTask={this.onCreateTask}
					onTaskStatusChange={this.onTaskStatusChange}
					isLoading={this.props.isLoading}
					error={this.props.error}
				/>
			</div>
		)
	}
}

// the return value of this function will get passed to App component as props
function mapStateToProps(state) {
	const { tasks, isLoading, error } = state.tasks
	return {
		// tasks: [],
		tasks,
		isLoading,
		error,
	}
}

export default connect(mapStateToProps)(App)
