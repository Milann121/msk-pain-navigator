
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useTranslation } from 'react-i18next';

const PrivacyPolicy = () => {
  const { t } = useTranslation();
  
  // Type the arrays properly to avoid TypeScript errors
  const basicIdentifiersItems = t('privacy.dataCategories.basicIdentifiers.items', { returnObjects: true }) as string[];
  const healthDataItems = t('privacy.dataCategories.healthData.items', { returnObjects: true }) as string[];
  const purposesItems = t('privacy.purposeAndBasis.purposes.items', { returnObjects: true }) as string[];
  const legalBasesItems = t('privacy.purposeAndBasis.legalBases.items', { returnObjects: true }) as string[];
  const dataStorageItems = t('privacy.dataStorage.items', { returnObjects: true }) as string[];
  const dataRetentionItems = t('privacy.dataRetention.items', { returnObjects: true }) as string[];
  const userRightsItems = t('privacy.userRights.items', { returnObjects: true }) as string[];
  const dataSharingItems = t('privacy.dataSharing.items', { returnObjects: true }) as string[];
  const protectionMeasuresItems = t('privacy.protectionMeasures.items', { returnObjects: true }) as string[];
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-1 bg-gradient-to-b from-background to-secondary/20 py-10 px-4">
        <Card className="max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-center mb-2">
              {t('privacy.title')}
            </CardTitle>
            <p className="text-center text-muted-foreground">
              {t('privacy.subtitle')}
            </p>
            <p className="text-center text-sm text-muted-foreground">
              {t('privacy.lastUpdated')}
            </p>
          </CardHeader>
          <CardContent className="prose prose-blue max-w-none space-y-6">
            
            <div>
              <h3 className="text-xl font-semibold mb-3">{t('privacy.dataController.title')}</h3>
              <ul className="space-y-1">
                <li>{t('privacy.dataController.companyName')}</li>
                <li>{t('privacy.dataController.businessAddress')}</li>
                <li>{t('privacy.dataController.emailContact')}</li>
                <li>{t('privacy.dataController.companyId')}</li>
                <li>{t('privacy.dataController.supervisoryAuthority')}</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">{t('privacy.dataCategories.title')}</h3>
              <div className="space-y-3">
                <div>
                  <h4 className="font-medium">{t('privacy.dataCategories.basicIdentifiers.title')}</h4>
                  <ul className="list-disc list-inside space-y-1">
                    {basicIdentifiersItems.map((item: string, index: number) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium">{t('privacy.dataCategories.healthData.title')}</h4>
                  <ul className="list-disc list-inside space-y-1">
                    {healthDataItems.map((item: string, index: number) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">{t('privacy.purposeAndBasis.title')}</h3>
              <div className="space-y-3">
                <div>
                  <h4 className="font-medium">{t('privacy.purposeAndBasis.purposes.title')}</h4>
                  <ul className="list-disc list-inside space-y-1">
                    {purposesItems.map((item: string, index: number) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium">{t('privacy.purposeAndBasis.legalBases.title')}</h4>
                  <ul className="list-disc list-inside space-y-1">
                    {legalBasesItems.map((item: string, index: number) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">{t('privacy.dataStorage.title')}</h3>
              <ul className="list-disc list-inside space-y-1">
                {dataStorageItems.map((item: string, index: number) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">{t('privacy.dataRetention.title')}</h3>
              <ul className="list-disc list-inside space-y-1">
                {dataRetentionItems.map((item: string, index: number) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">{t('privacy.userRights.title')}</h3>
              <ul className="list-disc list-inside space-y-1">
                {userRightsItems.map((item: string, index: number) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">{t('privacy.consent.title')}</h3>
              <p>{t('privacy.consent.text')}</p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">{t('privacy.dataSharing.title')}</h3>
              <ul className="list-disc list-inside space-y-1">
                {dataSharingItems.map((item: string, index: number) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">{t('privacy.protectionMeasures.title')}</h3>
              <ul className="list-disc list-inside space-y-1">
                {protectionMeasuresItems.map((item: string, index: number) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">{t('privacy.contact.title')}</h3>
              <ul className="space-y-1">
                <li>{t('privacy.contact.dpo')}</li>
                <li>{t('privacy.contact.email')}</li>
                <li>{t('privacy.contact.address')}</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">{t('privacy.updates.title')}</h3>
              <p>{t('privacy.updates.text')}</p>
            </div>

            <div className="border-t pt-4 mt-6">
              <h3 className="text-xl font-semibold mb-3">{t('privacy.acknowledgement.title')}</h3>
              <p className="font-medium">{t('privacy.acknowledgement.text')}</p>
            </div>

          </CardContent>
        </Card>
      </div>
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
