import { ListFilter as Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTodoContext } from '@/contexts/TodoContext';

const TodoFilters = () => {
  const { filterStatus, setFilterStatus } = useTodoContext();

  return (
    <div className="todo-filters">
      <Button
        variant={filterStatus === 'all' ? 'default' : 'outline'}
        size="sm"
        onClick={() => setFilterStatus('all')}
        className="flex-1">

        All
      </Button>
      <Button
        variant={filterStatus === 'active' ? 'default' : 'outline'}
        size="sm"
        onClick={() => setFilterStatus('active')}
        className="flex-1">

        Active
      </Button>
      <Button
        variant={filterStatus === 'completed' ? 'default' : 'outline'}
        size="sm"
        onClick={() => setFilterStatus('completed')}
        className="flex-1">

        Completed
      </Button>
    </div>);

};

export default TodoFilters;