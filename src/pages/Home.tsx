import { useState } from 'react';
import { Settings, Plus, ListFilter as Filter } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useTodoContext } from '@/contexts/TodoContext';
import TodoItem from '@/components/TodoItem';
import TodoFilters from '@/components/TodoFilters';

const Home = () => {
  const { todos, addTodo, filterStatus, setFilterStatus } = useTodoContext();
  const [newTodoText, setNewTodoText] = useState('');

  const handleAddTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTodoText.trim()) {
      addTodo({
        id: Date.now().toString(),
        title: newTodoText,
        completed: false,
        priority: 'medium',
        createdAt: new Date()
      });
      setNewTodoText('');
    }
  };

  const filteredTodos = todos.filter((todo) => {
    if (filterStatus === 'all') return true;
    if (filterStatus === 'active') return !todo.completed;
    if (filterStatus === 'completed') return todo.completed;
    return true;
  });

  return (
    <div className="min-h-screen bg-background">
      <div className="todo-container">
        <header className="todo-header">
          <h1 className="text-2xl font-bold text-foreground">Simple Todo</h1>
          <Link to="/settings">
            <Button variant="ghost" size="icon">
              <Settings className="h-5 w-5" />
            </Button>
          </Link>
        </header>

        <form onSubmit={handleAddTodo} className="todo-input">
          <Input
            type="text"
            placeholder="Add a new task..."
            value={newTodoText}
            onChange={(e) => setNewTodoText(e.target.value)}
            className="flex-1" />

          <Button type="submit" className="btn btn-primary">
            <Plus className="h-4 w-4 mr-1" />
            Add Task
          </Button>
        </form>

        <TodoFilters />

        <div className="todo-list">
          {filteredTodos.length > 0 ?
          filteredTodos.map((todo) =>
          <TodoItem key={todo.id} todo={todo} />
          ) :

          <div className="text-center py-8 text-muted-foreground">
              {filterStatus === 'all' ? 'No tasks yet. Add one above!' :
            filterStatus === 'active' ? 'No active tasks.' : 'No completed tasks.'}
            </div>
          }
        </div>
      </div>
    </div>);

};

export default Home;