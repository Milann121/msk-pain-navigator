
import { useAuth } from '@/contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import Header from '@/components/Header';
import WelcomeOverlay from '@/components/WelcomeOverlay';

const Index = () => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-1 bg-gradient-to-b from-blue-50 to-white py-10 px-4 flex items-center justify-center">
          <div className="text-blue-600">Načítava sa...</div>
        </div>
      </div>
    );
  }

  if (user) {
    return <Navigate to="/assessment" replace />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <WelcomeOverlay />
    </div>
  );
};

export default Index;
