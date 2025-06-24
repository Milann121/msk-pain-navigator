
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Header from '@/components/Header';
import { useTranslation } from 'react-i18next';

const PrivacyPolicy = () => {
  const { t } = useTranslation();
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-1 bg-gradient-to-b from-blue-50 to-white py-10 px-4">
        <Card className="max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-blue-700">
              {t('privacy.title')}
            </CardTitle>
          </CardHeader>
          <CardContent className="prose prose-blue max-w-none">
            <p>{t('privacy.intro')}</p>

            <h3>{t('privacy.whatTitle')}</h3>
            <p>
              {t('privacy.email')}
            </p>
            <p>
              {t('privacy.health')}
            </p>

            <h3>{t('privacy.whyTitle')}</h3>
            <ul>
              {t('privacy.whyList', { returnObjects: true }).map((item: string) => (
                <li key={item}>{item}</li>
              ))}
            </ul>

            <h3>{t('privacy.protectTitle')}</h3>
            <p>{t('privacy.protectText')}</p>

            <h3>{t('privacy.rightsTitle')}</h3>
            <p>{t('privacy.rightsIntro')}</p>
            <ul>
              {t('privacy.rightsList', { returnObjects: true }).map((item: string) => (
                <li key={item}>{item}</li>
              ))}
            </ul>

            <p dangerouslySetInnerHTML={{ __html: t('privacy.contact') }} />

            <h3>{t('privacy.endTitle')}</h3>
            <p>{t('privacy.endText')}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
