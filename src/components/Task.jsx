function Task(props) {
	return (
		<div className='task'>
			<header className='task-header'>
				<span>{props.task.title}</span>
				<span className='font-bold'>{props.task.status}</span>
			</header>
			<hr />
			<p className='task-body'>{props.task.description}</p>
		</div>
	)
}
export default Task
