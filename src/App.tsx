import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './components/theme-provider';
import { Toaster } from '@/components/ui/toaster';
import Home from './pages/Home';
import Settings from './pages/Settings';
import { TodoProvider } from './context/TodoContext';

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="simple-todo-theme">
      <TodoProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </Router>
        <Toaster />
      </TodoProvider>
    </ThemeProvider>
  );
}

export default App;
