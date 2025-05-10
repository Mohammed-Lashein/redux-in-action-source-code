import { TASK_STATUSES } from './TasksPage';
function Task(props) {
	return (
		<div className='task'>
			<header className='task-header'>
				<span>{props.task.title}</span>
				<select name="task_status" id="" className='bg-blue-200 rounded-md'>
				{TASK_STATUSES.map((status) => (
					<option value={status}>{status}</option>
				))}
				</select>
				{/* <span className='font-bold'>{props.task.status}</span> */}
			</header>
			<hr />
			<p className='task-body'>{props.task.description}</p>
		</div>
	)
}
export default Task
