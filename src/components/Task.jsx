function Task(props) {
	return (
		<div className='task'>
			<header className='task-header'>
				<span>{props.task.title}</span>
			</header>
			<hr />
			<p className='task-body'>{props.task.description}</p>
		</div>
	)
}
export default Task
