
import Header from '@/components/Header';

const LoadingView = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-1 bg-gradient-to-b from-blue-50 to-white py-10 px-4 flex items-center justify-center">
        <div className="text-blue-600">Načítava sa...</div>
      </div>
    </div>
  );
};

export default LoadingView;
