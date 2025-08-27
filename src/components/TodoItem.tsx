import { useState } from 'react';
import { CreditCard as Edit, Trash, Check, X, Calendar1 as Calendar, Flag } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useTodoContext } from '@/contexts/TodoContext';
import { Todo } from '@/types';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';

interface TodoItemProps {
  todo: Todo;
}

const TodoItem = ({ todo }: TodoItemProps) => {
  const { toggleTodo, updateTodo, deleteTodo } = useTodoContext();
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(todo.title);

  const handleToggle = () => {
    toggleTodo(todo.id);
  };

  const handleEdit = () => {
    setIsEditing(true);
    setEditedTitle(todo.title);
  };

  const handleSave = () => {
    if (editedTitle.trim()) {
      updateTodo(todo.id, { title: editedTitle });
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleDelete = () => {
    deleteTodo(todo.id);
  };

  const getPriorityColor = () => {
    switch (todo.priority) {
      case 'high':return 'bg-error';
      case 'medium':return 'bg-warning';
      case 'low':return 'bg-success';
      default:return 'bg-primary';
    }
  };

  return (
    <div
      className={cn(
        "todo-item relative overflow-hidden group animate-slide-in",
        todo.completed && "todo-item-completed"
      )}>

      <div className={`priority-indicator ${getPriorityColor()}`}></div>
      
      <Checkbox
        checked={todo.completed}
        onCheckedChange={handleToggle}
        className="todo-checkbox" />

      
      <div className="todo-content">
        {isEditing ?
        <Input
          value={editedTitle}
          onChange={(e) => setEditedTitle(e.target.value)}
          autoFocus
          className="mb-2" /> :


        <>
            <h3 className={cn("font-medium", todo.completed && "line-through")}>
              {todo.title}
            </h3>
            {todo.description &&
          <p className="text-sm text-muted-foreground mt-1">{todo.description}</p>
          }
            <div className="flex items-center gap-2 mt-2">
              <Badge variant="outline" className="text-xs flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                {format(new Date(todo.createdAt), 'MMM d')}
              </Badge>
              <Badge
              variant="outline"
              className={cn(
                "text-xs flex items-center gap-1",
                todo.priority === 'high' && "border-error text-error",
                todo.priority === 'medium' && "border-warning text-warning",
                todo.priority === 'low' && "border-success text-success"
              )}>

                <Flag className="h-3 w-3" />
                {todo.priority.charAt(0).toUpperCase() + todo.priority.slice(1)}
              </Badge>
            </div>
          </>
        }
      </div>
      
      <div className="todo-actions">
        {isEditing ?
        <>
            <Button onClick={handleSave} size="sm" variant="ghost">
              <Check className="h-4 w-4" />
            </Button>
            <Button onClick={handleCancel} size="sm" variant="ghost">
              <X className="h-4 w-4" />
            </Button>
          </> :

        <>
            <Button
            onClick={handleEdit}
            size="sm"
            variant="ghost"
            className="opacity-0 group-hover:opacity-100 transition-opacity">

              <Edit className="h-4 w-4" />
            </Button>
            <Button
            onClick={handleDelete}
            size="sm"
            variant="ghost"
            className="opacity-0 group-hover:opacity-100 transition-opacity text-error hover:text-error">

              <Trash className="h-4 w-4" />
            </Button>
          </>
        }
      </div>
    </div>);

};

export default TodoItem;