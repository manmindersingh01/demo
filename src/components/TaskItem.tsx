import { Trash2 } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { Task } from '@/types';
import { useTodoContext } from '@/context/TodoContext';

interface TaskItemProps {
  task: Task;
}

const TaskItem = ({ task }: TaskItemProps) => {
  const { toggleTask, deleteTask } = useTodoContext();

  return (
    <div className="group task-item">
      <Checkbox 
        id={`task-${task.id}`}
        checked={task.completed}
        onCheckedChange={() => toggleTask(task.id)}
        className="h-5 w-5 rounded border-gray-300 text-primary focus:ring-primary"
      />
      <label 
        htmlFor={`task-${task.id}`}
        className={`flex-1 cursor-pointer ${task.completed ? 'line-through text-muted-foreground' : ''}`}
      >
        {task.text}
      </label>
      <button 
        onClick={() => deleteTask(task.id)}
        className="text-muted-foreground hover:text-error transition-colors opacity-0 group-hover:opacity-100"
        aria-label="Delete task"
      >
        <Trash2 className="h-4 w-4" />
      </button>
    </div>
  );
};

export default TaskItem;
