import Task from "./Task.jsx"

function TaskList(props) {
	return (
		<div className='task-list'>
			<h1 className='task-list__title'>{props.status}</h1>
			{props.tasks.map((task) => (
				<Task
					key={task.id}
					task={task}
					onTaskStatusChange={props.onTaskStatusChange}
				/>
			))}
		</div>
	)
}
export default TaskList
