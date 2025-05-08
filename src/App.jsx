import "./App.css"
import TasksPage from "./components/TasksPage.jsx"

const mockTasks = [
	{
		id: 1,
		title: "Learn Redux",
		description: "The store, actions, and reducers, oh my!",
		status: "Unstarted",
	},
	{
		id: 2,
		title: "Peace on Earth",
		description: "No big deal.",
		status: "In Progress",
	},
]
function App() {
	return (
		<div className='main-content'>
			<TasksPage tasks={mockTasks} />
		</div>
	)
}

export default App
