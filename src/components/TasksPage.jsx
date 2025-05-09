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
	onTaskTitleChange = (e) => {
		this.setState({ cardTitle: e.target.value })
	}
	onTaskDescriptionChange = () => {
		this.setState({ cardDescription: e.target.value })
	}
	toggleNewTaskFormVisibility = () => {
		this.setState({ showNewCardForm: !this.state.showNewCardForm })
		console.log(this.state.showNewCardForm)
	}
	renderNewTaskForm() {
		return (
			<form
				action=''
				onSubmit={this.handleNewTaskAddition}
				className='p-10 flex flex-col gap-4 items-end max-w-2xl mx-auto'
			>
				<section className='w-full flex gap-2 flex-col'>
					<input
						type='text'
						placeholder='title'
						className='bg-white p-2 rounded-sm w-full'
						value={this.state.cardTitle}
						onChange={(e) => this.onTaskTitleChange(e)}
					/>
					<input
						type='text'
						placeholder='description'
						className='bg-white p-2 rounded-sm w-full'
						value={this.state.cardDescription}
						onChange={(e) => this.onTaskDescriptionChange(e)}
					/>
				</section>
				<button className='rounded-md bg-green-500 text-white p-3 cursor-pointer border-transparent  hover:bg-green-600'>
					save
				</button>
			</form>
		)
	}
	render() {
		return (
			<>
				<div className='tasks'>
				<button
				type='button'
					className='bg-slate-200 p-2 rounded-md cursor-pointer hover:bg-slate-300'
					onClick={this.toggleNewTaskFormVisibility}
				>
					+ New Task
				</button>
					{this.state.showNewCardForm && this.renderNewTaskForm()}
					<div className='task-lists'>{this.renderTaskLists()}</div>
				</div>
			</>
		)
	}
}

export default TasksPage
