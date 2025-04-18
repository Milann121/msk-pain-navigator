
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();

  return (
    <header className="bg-gradient-to-r from-blue-700 to-blue-500 text-white py-4 px-6 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-2" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
          <div className="bg-white p-2 rounded-full">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              className="text-blue-600"
            >
              <path d="M20 11c0-4.4-3.6-8-8-8s-8 3.6-8 8 3.6 8 8 8" />
              <path d="M2 15h8" />
              <path d="M2 11h18" />
              <path d="M2 7h8" />
              <path d="M17 21l-5-5 5-5" />
            </svg>
          </div>
          <h1 className="text-xl font-bold">Dotazník bolestí chrbtice</h1>
        </div>
        <nav>
          <ul className="flex space-x-6">
            <li>
              <a href="/" className="hover:text-blue-200 transition-colors">
                Domov
              </a>
            </li>
            <li>
              <a href="#o-nas" className="hover:text-blue-200 transition-colors">
                O nás
              </a>
            </li>
            <li>
              <a href="#kontakt" className="hover:text-blue-200 transition-colors">
                Kontakt
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
