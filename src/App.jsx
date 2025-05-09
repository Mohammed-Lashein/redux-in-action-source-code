import { connect } from 'react-redux'
import "./App.css"
import TasksPage from "./components/TasksPage.jsx"
import { Component } from 'react'

class App extends Component {
	render() {
		return (
			<div className='main-content'>
				<TasksPage tasks={this.props.tasks} />
			</div>
		)
	}
}

// the return value of this function will get passed to App component as props
function mapStateToProps(state) {
	return {
		tasks: state.tasks
	}
}

export default connect(mapStateToProps)(App)
