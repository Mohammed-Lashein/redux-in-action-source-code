import { Component } from "react"
import TaskList from "./TaskList.jsx"
const TASK_STATUSES = ["Unstarted", "In Progress", "Completed"]
class TasksPage extends Component {
	// Why didn't we need to call the constructor here ? TO UNDERSTAND
	// => We needn't to interact with the props pased to this component, so react internally called super(props)
	// for us .
	// But things will change now as we need to read some values from the props

	constructor(props) {
		super(props)
	}
	state = {
		showNewCardForm: false,
		cardTitle: "",
		cardDescription: "",
	}
	renderTaskLists() {
		const { tasks } = this.props
		return TASK_STATUSES.map((status) => {
			const statusTasks = tasks.filter((task) => task.status === status)
			return (
				<TaskList
					key={status}
					status={status}
					tasks={statusTasks}
				/>
			)
		})
	}
	handleNewTaskAddition = (e) => {
		e.preventDefault()
		console.log("handling new task submission !")
	}
	renderNewTaskForm() {
		return (
			<form
				action=''
				onSubmit={this.handleNewTaskAddition}
			>
				<button>+ New Task</button>
				<input
					type='text'
					placeholder='title'
				/>
				<input
					type='text'
					placeholder='description'
				/>
				<button>save</button>
			</form>
		)
	}
	state = {}
	render() {
		return (
			<>
				<div className='tasks'>
					{this.renderNewTaskForm()}
					<div className='task-lists'>{this.renderTaskLists()}</div>
				</div>
			</>
		)
	}
}

export default TasksPage
