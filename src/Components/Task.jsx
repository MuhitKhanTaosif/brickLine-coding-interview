
export default function Task({ task, onDelete, onToggle }) {
    return (
        <div className="flex mb-0.5">
            <input
                type="checkbox"
                checked={task.completed}
                onChange={() => onToggle(task.id)}
            />
            <span className={`flex-1 ${task.completed ? 'line-through' : ''} text-2xl`}>
                {task.title}
            </span>
            <button onClick={() => onDelete(task.id)} className="text-red-500">Delete</button>
        </div>
    );
}