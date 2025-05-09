import { connect } from "react-redux"
import "./App.css"
import TasksPage from "./components/TasksPage.jsx"
import { Component } from "react"
import { createTask } from "./actions/index.js"

class App extends Component {
	onCreateTask = ({ title, description }) => {
		this.props.dispatch(createTask({ title, description }))
	}
	render() {
		return (
			<div className='main-content'>
				<TasksPage
					tasks={this.props.tasks}
					onCreateTask={this.onCreateTask}
				/>
			</div>
		)
	}
}

// the return value of this function will get passed to App component as props
function mapStateToProps(state) {
	return {
		tasks: state.tasks,
	}
}

export default connect(mapStateToProps)(App)
