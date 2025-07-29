
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useTranslation } from 'react-i18next';

const PrivacyPolicy = () => {
  const { t } = useTranslation();
  
  const renderSection = (sectionKey: string, hasSubsections: boolean = false) => {
    const section = t(`privacy.${sectionKey}`, { returnObjects: true }) as any;
    
    return (
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-3">{section.title}</h3>
        {hasSubsections ? (
          <div className="space-y-4">
            {Object.keys(section).filter(key => key !== 'title').map(key => {
              if (Array.isArray(section[key])) {
                return (
                  <div key={key}>
                    <p className="font-medium mb-2">{key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}:</p>
                    <ul className="list-disc pl-6 space-y-1">
                      {section[key].map((item: string, index: number) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  </div>
                );
              } else if (typeof section[key] === 'string') {
                return <p key={key} className="mb-2">{section[key]}</p>;
              }
              return null;
            })}
          </div>
        ) : (
          <>
            {section.items && (
              <ul className="list-disc pl-6 space-y-1">
                {section.items.map((item: string, index: number) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            )}
            {section.text && <p>{section.text}</p>}
          </>
        )}
      </div>
    );
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-1 bg-gradient-to-b from-blue-50 to-white py-10 px-4">
        <Card className="max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-blue-700">
              {t('privacy.title')}
            </CardTitle>
            <p className="text-sm text-gray-600">{t('privacy.subtitle')}</p>
            <p className="text-xs text-gray-500">{t('privacy.lastUpdated')}</p>
          </CardHeader>
          <CardContent className="prose prose-blue max-w-none">
            {renderSection('section1', true)}
            {renderSection('section2', true)}
            {renderSection('section3', true)}
            {renderSection('section4')}
            {renderSection('section5')}
            {renderSection('section6')}
            {renderSection('section7')}
            {renderSection('section8')}
            {renderSection('section9')}
            {renderSection('section10')}
            {renderSection('section11')}
            
            <div className="mt-8 p-4 bg-blue-50 rounded-lg">
              <h3 className="text-lg font-semibold mb-2">{t('privacy.consent.title')}</h3>
              <p>{t('privacy.consent.text')}</p>
            </div>
          </CardContent>
        </Card>
      </div>
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
