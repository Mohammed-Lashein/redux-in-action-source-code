import { TASK_STATUSES } from "./TasksPage"
function Task(props) {
	function handleTaskStatusChange(e) {
		props.onTaskStatusChange({ id: props.task.id, newStatus: e.target.value })
	}

	return (
		<div className='task'>
			<header className='task-header'>
				<span>{props.task.title}</span>
				<select
					name='task_status'
					id=''
					className='bg-blue-200 rounded-md'
					onChange={handleTaskStatusChange}
					value={props.task.status}
				>
					{TASK_STATUSES.map((status) => (
						<option
							value={status}
							key={status}
						>
							{status}
						</option>
					))}
				</select>
			</header>
			<hr />
			<p className='task-body'>{props.task.description}</p>
		</div>
	)
}
export default Task
