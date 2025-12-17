import React from 'react';
import { useTranslation } from 'react-i18next';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  return (
    <div className="dropdown">
      <button
        className="btn btn-outline-success dropdown-toggle"
        type="button"
        id="languageDropdown"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        {/* Show current language label */}
        <i className="bi bi-globe me-2"></i>
        {i18n.language === 'en' ? 'English' : 'العربية'}
      </button>
      
      <ul className="dropdown-menu lang-li mt-2" aria-labelledby="languageDropdown" style={{ minWidth: 'auto', width: 'max-content' }}>
        <li className=''>
          <button
            className="dropdown-item"
            onClick={() => i18n.changeLanguage('en')}
            disabled={i18n.language === 'en'} // Disable if already active
          >
            🇺🇸 English
          </button>
        </li>
        <li className=''>
          <button
            className="dropdown-item"
            onClick={() => i18n.changeLanguage('ar')}
            disabled={i18n.language === 'ar'} // Disable if already active
            style={{ fontFamily: 'Cairo, sans-serif' }} // Optional: Ensure Arabic font looks good
          >
            🇪🇬 العربية
          </button>
        </li>
      </ul>
    </div>
  );
};

export default LanguageSwitcher;