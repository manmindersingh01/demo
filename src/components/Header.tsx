import { Link } from 'react-router-dom';
import { Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Header = () => {
  return (
    <header className="bg-card border-b border-border">
      <div className="container max-w-md mx-auto px-4 py-4 flex items-center justify-between">
        <h1 className="text-xl font-medium text-foreground">Simple Todo</h1>
        <Link to="/settings">
          <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
            <Settings className="h-5 w-5" />
          </Button>
        </Link>
      </div>
    </header>
  );
};

export default Header;
