import { useTranslation } from 'react-i18next';

function AboutPage() {
    const { t } = useTranslation('about');

    return (
        <div>
            {t('О сайте')}
            {t('sadsdas')}
        </div>
    );
}

export default AboutPage;
