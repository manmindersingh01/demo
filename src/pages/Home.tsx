import { useState } from 'react';
import { motion } from 'framer-motion';
import { Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import TaskList from '@/components/TaskList';
import EmptyState from '@/components/EmptyState';
import Header from '@/components/Header';
import { useTodoContext } from '@/context/TodoContext';

const Home = () => {
  const [newTask, setNewTask] = useState('');
  const { tasks, addTask, activeFilter } = useTodoContext();

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTask.trim()) {
      addTask(newTask.trim());
      setNewTask('');
    }
  };

  const filteredTasks = tasks.filter(task => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'active') return !task.completed;
    if (activeFilter === 'completed') return task.completed;
    return true;
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container max-w-md mx-auto px-4 py-8">
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="app-card mb-6"
        >
          <form onSubmit={handleAddTask} className="flex gap-2">
            <Input
              type="text"
              className="task-input"
              placeholder="Add a new task..."
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
            />
            <Button type="submit" className="btn-primary">
              Add
            </Button>
          </form>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="app-card"
        >
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid grid-cols-3 mb-4">
              <TabsTrigger value="all" className="filter-tab">All</TabsTrigger>
              <TabsTrigger value="active" className="filter-tab">Active</TabsTrigger>
              <TabsTrigger value="completed" className="filter-tab">Completed</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all" className="mt-0">
              {filteredTasks.length > 0 ? <TaskList tasks={filteredTasks} /> : <EmptyState />}
            </TabsContent>
            
            <TabsContent value="active" className="mt-0">
              {filteredTasks.length > 0 ? <TaskList tasks={filteredTasks} /> : <EmptyState type="active" />}
            </TabsContent>
            
            <TabsContent value="completed" className="mt-0">
              {filteredTasks.length > 0 ? <TaskList tasks={filteredTasks} /> : <EmptyState type="completed" />}
            </TabsContent>
          </Tabs>
          
          <div className="mt-4 text-sm text-muted-foreground">
            {tasks.length} {tasks.length === 1 ? 'task' : 'tasks'} • {tasks.filter(t => t.completed).length} completed
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default Home;
