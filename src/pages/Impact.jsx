import React from 'react';
import { useTranslation } from 'react-i18next';
import Footer from '../components/common/Footer';
import '../styles/Impact.css';

const Impact = () => {
  const { t } = useTranslation();
  return (
    <div className="impact-page">
      <section className="impact-hero container">
        <h1>{t('impact.title') || 'Impact'}</h1>
        <p>{t('impact.subtitle') || 'Our impact statistics and stories.'}</p>
      </section>
      {/* Add detailed impact stats or content here */}
      <Footer />
    </div>
  );
};

export default Impact;
