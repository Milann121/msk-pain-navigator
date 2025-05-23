
import { Menu } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';
import { useAuth } from '@/contexts/AuthContext';

const Header = () => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const { user, signOut } = useAuth();

  const navigationLinks = [
    { href: '/', label: 'Domov' },
  ];

  if (user) {
    navigationLinks.push(
      { href: '/assessment', label: 'Dotazník bolesti' },
      { href: '/my-exercises', label: 'Moje cviky' },
      { href: '/profile', label: 'Môj profil' },
      { href: '/blog', label: 'Blog' }
    );
  } else {
    navigationLinks.push(
      { href: '/blog', label: 'Blog' }
    );
  }

  const handleAuthClick = () => {
    if (user) {
      signOut();
    } else {
      navigate('/auth');
    }
  };

  const MobileMenu = () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[300px] bg-white">
        <nav className="mt-6">
          <ul className="space-y-4">
            {navigationLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="block px-4 py-2 text-lg hover:bg-blue-50 rounded-md transition-colors"
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li>
              <Button
                onClick={handleAuthClick}
                variant="ghost"
                className="w-full text-left justify-start px-4 py-2 text-lg"
              >
                {user ? 'Odhlásiť sa' : 'Prihlásiť sa'}
              </Button>
            </li>
          </ul>
        </nav>
      </SheetContent>
    </Sheet>
  );

  return (
    <header className="bg-gradient-to-r from-blue-700 to-blue-500 text-white py-4 px-3 md:px-6 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <div 
          className="flex items-center space-x-2 md:space-x-4" 
          onClick={() => navigate('/')} 
          style={{ cursor: 'pointer' }}
        >
          <div className="bg-white p-1.5 md:p-2 rounded-full">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="20" 
              height="20" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              className="text-blue-600 md:w-6 md:h-6"
            >
              <path d="M20 11c0-4.4-3.6-8-8-8s-8 3.6-8 8 3.6 8 8 8" />
              <path d="M2 15h8" />
              <path d="M2 11h18" />
              <path d="M2 7h8" />
              <path d="M17 21l-5-5 5-5" />
            </svg>
          </div>
          <h1 className="text-lg md:text-xl font-bold">Dotazník bolestí chrbtice</h1>
        </div>
        
        {isMobile ? (
          <MobileMenu />
        ) : (
          <nav className="flex items-center space-x-6">
            {navigationLinks.slice(1).map((link) => (
              <Button 
                key={link.label} 
                variant="ghost" 
                className="text-white hover:bg-blue-600"
                onClick={() => navigate(link.href)}
              >
                {link.label}
              </Button>
            ))}
            <Button
              onClick={handleAuthClick}
              variant="outline"
              className="bg-white text-blue-600 hover:bg-blue-50"
            >
              {user ? 'Odhlásiť sa' : 'Prihlásiť sa'}
            </Button>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
