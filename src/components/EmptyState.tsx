import { ClipboardList } from 'lucide-react';

interface EmptyStateProps {
  type?: 'all' | 'active' | 'completed';
}

const EmptyState = ({ type = 'all' }: EmptyStateProps) => {
  let message = '';
  
  switch (type) {
    case 'active':
      message = 'No active tasks';
      break;
    case 'completed':
      message = 'No completed tasks';
      break;
    default:
      message = 'No tasks yet';
  }

  return (
    <div className="empty-state">
      <div className="mb-4 bg-muted rounded-full p-4 inline-block">
        <ClipboardList className="h-8 w-8 text-muted-foreground" />
      </div>
      <h3 className="text-lg font-medium">{message}</h3>
      {type === 'all' && <p>Add your first task to get started</p>}
      {type === 'active' && <p>All your tasks are completed</p>}
      {type === 'completed' && <p>Complete some tasks to see them here</p>}
    </div>
  );
};

export default EmptyState;
