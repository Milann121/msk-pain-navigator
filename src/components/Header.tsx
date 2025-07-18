
import { Menu } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';
import { useAuth } from '@/contexts/AuthContext';
import LanguageDropdown from './LanguageDropdown';

const Header = () => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const { user, signOut } = useAuth();
  const { t } = useTranslation();

  const navigationLinks = user
    ? [
        { href: '/domov', label: t('header.home') },
        { href: '/profile', label: t('header.profile') },
        { href: '/my-exercises', label: t('header.myExercises') },
        { href: '/assessment', label: t('header.assessment') }
      ]
    : [
        { href: '/', label: t('header.home') }
      ];

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
        <Button variant="ghost" size="icon" className="lg:hidden">
          <Menu className="h-6 w-6" />
          <span className="sr-only">{t('header.toggleMenu')}</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[300px] bg-white">
        <nav className="mt-6">
          <ul className="space-y-4">
            {navigationLinks.map((link) => (
              <li key={link.label}>
                <Button
                  onClick={() => navigate(link.href)}
                  variant="ghost"
                  className="w-full text-left justify-start px-4 py-2 text-lg hover:bg-muted rounded-md transition-colors"
                >
                  {link.label}
                </Button>
              </li>
            ))}
            <li>
              <Button
                onClick={handleAuthClick}
                variant="ghost"
                className="w-full text-left justify-start px-4 py-2 text-lg"
              >
                {user ? t('header.signOut') : t('header.signIn')}
              </Button>
            </li>
            <li className="pt-2 border-t">
              <div className="px-4">
                <LanguageDropdown />
              </div>
            </li>
          </ul>
        </nav>
      </SheetContent>
    </Sheet>
  );

  return (
    <header className="bg-primary text-primary-foreground py-4 px-3 md:px-6 shadow-md">
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
              className="text-primary md:w-6 md:h-6"
            >
              <path d="M20 11c0-4.4-3.6-8-8-8s-8 3.6-8 8 3.6 8 8 8" />
              <path d="M2 15h8" />
              <path d="M2 11h18" />
              <path d="M2 7h8" />
              <path d="M17 21l-5-5 5-5" />
            </svg>
          </div>
          <h1 className="text-lg md:text-xl font-bold">{t('header.brand')}</h1>
        </div>
        
        {/* Show mobile menu only on small screens (below lg breakpoint) */}
        <div className="lg:hidden">
          <MobileMenu />
        </div>

        {/* Show full navigation on tablet and desktop (lg breakpoint and above) */}
        <nav className="hidden lg:flex items-center space-x-6">
          {navigationLinks.map((link) => (
            <Button 
              key={link.label} 
              variant="ghost" 
              className="text-primary-foreground hover:bg-primary/80"
              onClick={() => navigate(link.href)}
            >
              {link.label}
            </Button>
          ))}
          <LanguageDropdown />
          <Button
            onClick={handleAuthClick}
            variant="outline"
            className="bg-accent text-accent-foreground hover:bg-accent/90"
          >
            {user ? t('header.signOut') : t('header.signIn')}
          </Button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
