import { Component } from "react"
import TaskList from "./TaskList/TaskList"

const TASK_STATUSES = ["Unstarted", "In Progress", "Completed"]
class TasksPage extends Component {
	// Why didn't we need to call the constructor here ? TO UNDERSTAND
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
	state = {}
	render() {
		return (
			<div className='tasks'>
				<div className='task-lists'>{this.renderTaskLists()}</div>
			</div>
		)
	}
}

export default TasksPage
