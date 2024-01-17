import React, {useState} from 'react';
import SearchTask from "./SearchTask.jsx";
import TaskActions from "./TaskActions.jsx";
import TaskList from "./TaskList.jsx";
import AddTaskModal from "./AddTaskModal.jsx";
import NoTasksFound from "./NoTasksFound.jsx";


const defaultTask = {
    id: crypto.randomUUID(),
    title: "Learn React Native",
    description:
        "I want to Learn React such thanI can treat it like my slave and make it do whatever I want to do.",
    tags: ["web", "react", "js"],
    priority: "High",
    isFavorite: true,
};
const TaskBoard = () => {
    const [tasks, setTasks] = useState([defaultTask]);
    const [showAddModal, setShowAddModal] = useState(false);
    const [taskToUpdate, setTaskToUpdate] = useState(null)

    const handleAddEditTask = (newTask, isAdd) => {
        if (isAdd) {

            setTasks([...tasks, newTask])
        } else {
            setTasks(
                tasks.map((task) => {
                    if (task.id === newTask.id) {
                        return newTask;
                    }
                    return task;
                })
            )
        }
        setShowAddModal(false)


    }

    const handleCloseClick = () => {
        setShowAddModal(false);
        setTaskToUpdate(null);
    }

    const handleEditTask = (task) => {
        setTaskToUpdate(task)
        setShowAddModal(true);
    }

    const handleDeleteTask = (taskId) => {
        const tasksAfterDelete = tasks.filter((task) => task.id !== taskId)
        setTasks(tasksAfterDelete)
    }

    const handleDeleteAllClick = () => {
        tasks.length = 0;
        setTasks([...tasks])
    }

    const handleFavorite = (taskId) => {
        const taskIndex = tasks.findIndex((task) => task.id === taskId);
        const newTasks = [...tasks]
        newTasks[taskIndex].isFavorite = !newTasks[taskIndex].isFavorite;

        setTasks(newTasks)
    }

    const handleSearch = (searchTerm) => {

        const filtered = tasks.filter((task) => task.title.toLowerCase().includes(searchTerm.toLowerCase()))

        setTasks([...filtered])
    }

    return (
        <section className="mb-20" id="tasks">
            {showAddModal &&
                <AddTaskModal onSave={handleAddEditTask} taskToUpdate={taskToUpdate} onCloseClick={handleCloseClick}/>}
            <div className="container">
                <div className="p-2 flex justify-end">
                    <SearchTask onSearch={handleSearch}/>
                </div>
                <div
                    className="rounded-xl border border-[rgba(206,206,206,0.12)] bg-[#1D212B] px-6 py-8 md:px-9 md:py-16">

                    <TaskActions onAddClick={() => setShowAddModal(true)} onDeleteAllClick={handleDeleteAllClick}/>
                    {
                        tasks.length > 0 ? (
                            <TaskList tasks={tasks} onEdit={handleEditTask} onDelete={handleDeleteTask}
                                      onFav={handleFavorite}/>
                        ) : (
                            <NoTasksFound/>
                        )
                    }
                </div>
            </div>
        </section>
    );
};

export default TaskBoard;