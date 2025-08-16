import { connect } from "react-redux"
import "./App.css"
import TasksPage from "./components/TasksPage.jsx"
import { Component } from "react"
import { createTask, editTask, editTaskUsingMiddleWare, fetchTasks } from "./actions/index.js"
import { Toaster } from "sonner"

class App extends Component {
	componentDidMount() {
		this.props.dispatch(fetchTasks())
	}
	onCreateTask = ({ title, description }) => {
		this.props.dispatch(createTask({ title, description }))
	}
	onTaskStatusChange = (id, { status }) => {
		this.props.dispatch(editTaskUsingMiddleWare(id, { status }))
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
	// console.log('this is tasks in mapStateToProps');
	// console.log(tasks);
	
	// Since now we don't return the tasks directly from the reducer (we made a general api middleware to 
	// to handle tasks fetching), so we need to be use tasks.tasks to pass it to TasksPage component in order to
	// separate the redux logic from the presentational components
	return {
		tasks: tasks,
		isLoading,
		error,
	}
}

export default connect(mapStateToProps)(App)
