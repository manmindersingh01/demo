import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Moon, Sun, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { useTheme } from '@/components/theme-provider';
import { useTodoContext } from '@/context/TodoContext';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const Settings = () => {
  const { setTheme, theme } = useTheme();
  const { clearAllTasks } = useTodoContext();
  const [showCompletedFirst, setShowCompletedFirst] = useState(false);
  
  const handleThemeToggle = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-card border-b border-border">
        <div className="container max-w-md mx-auto px-4 py-4 flex items-center">
          <Link to="/" className="text-primary hover:text-primary-600 transition-colors">
            <ArrowLeft className="h-6 w-6" />
          </Link>
          <h1 className="text-xl font-medium ml-4">Settings</h1>
        </div>
      </header>
      
      <main className="container max-w-md mx-auto px-4 py-8">
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="app-card space-y-6"
        >
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-base">Dark Mode</Label>
              <p className="text-sm text-muted-foreground">Toggle between light and dark themes</p>
            </div>
            <div className="flex items-center space-x-2">
              <Sun className="h-4 w-4 text-muted-foreground" />
              <Switch 
                checked={theme === 'dark'}
                onCheckedChange={handleThemeToggle}
              />
              <Moon className="h-4 w-4 text-muted-foreground" />
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-base">Show completed first</Label>
              <p className="text-sm text-muted-foreground">Display completed tasks at the top</p>
            </div>
            <Switch 
              checked={showCompletedFirst}
              onCheckedChange={setShowCompletedFirst}
            />
          </div>
          
          <div className="pt-4 border-t border-border">
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive" className="w-full">
                  <Trash2 className="h-4 w-4 mr-2" />
                  Clear All Tasks
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete all your tasks.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={clearAllTasks}>Delete All</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </motion.div>
        
        <div className="mt-8 text-center text-sm text-muted-foreground">
          <p>Simple Todo v1.0.0</p>
          <p className="mt-1">Made with ❤️ for productivity</p>
        </div>
      </main>
    </div>
  );
};

export default Settings;
