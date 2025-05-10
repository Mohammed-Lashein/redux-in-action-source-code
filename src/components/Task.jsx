import { TASK_STATUSES } from "./TasksPage"
function Task(props) {
	function handleTaskStatusChange(e) {
		props.onTaskStatusChange(props.task.id, { status: e.target.value })
	}

	return (
		<div className='task'>
			<header className='task-header'>
				<span>{props.task.title}</span>
				<select
					name='task_status'
					className='bg-blue-200 rounded-md'
					// Note that in class components, the e obj is passed automatically to the cb fn (no need to
					// pass it explicitly as we do with functional components)
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
