import React from "react";
import { useTranslation } from 'react-i18next';
import appStoreBadge from "../../assets/images/Available_on_the_App_Store_SVG.svg";
import googlePlayBadge from "../../assets/images/Google_Play_Store_badge_EN.svg";
import amazonPayLogo from "../../assets/images/Amazon_Pay_logo.svg";
import amexLogo from "../../assets/images/American_Express_logo.svg";
import mastercardLogo from "../../assets/images/Mastercard-logo.svg";
import paypalLogo from "../../assets/images/PayPal.svg";

function Footer() {
  const { t } = useTranslation();
  return (
    <footer className="bg-light py-5 mt-5 d-flex justify-content-center">
      <div className=" px-2 w-100 mx-4">
        {/* Top Section: App Download */}
        <div className="row gy-4 align-items-center">
          <div className="col-lg-6">
            <h4 className="mb-1">{t('footer.getApp')}</h4>
            <p className="mb-0 text-muted">{t('footer.sendLink')}</p>
          </div>
          <div className="col-lg-6">
            <form className="d-flex">
              <input
                type="email"
                className="form-control me-2"
                placeholder={t('footer.emailPlaceholder')}
                aria-label="Email"
              />
              <button
                className="btn bg-main text-white flex-shrink-0"
                type="submit"
              >
                {t('footer.shareApp')}
              </button>
            </form>
          </div>
        </div>

        <hr className="my-4" />

        {/* Bottom Section: Payment & App Stores */}
        <div className="row gy-4 ">
          {/* Payment Partners */}
          <div className="col-md-6 d-flex align-items-center me-auto">
            <span className="text-muted me-3">{t('footer.paymentPartners')}</span>
            <div className="d-flex gap-2">
              <img
                src={amazonPayLogo}
                className="w-25"
                alt="Amazon Pay"
                height="30"
              />
              <img
                src={amexLogo}
                className="w-25"
                alt="American Express"
                height="30"
              />
              <img
                src={mastercardLogo}
                className="w-25"
                alt="Mastercard"
                height="30"
              />
              <img src={paypalLogo} className="w-25" alt="PayPal" height="30" />
            </div>
          </div>

          {/* App Store Links */}
          <div className="col-md-6 d-flex align-items-center justify-content-md-end ms-auto">
            <span className="text-muted me-3">{t('footer.getDeliveries')}</span>
            <div className="d-flex gap-2">
              <a href="#!" aria-label="App Store" className="text-center">
                <img
                  src={appStoreBadge}
                  className="w-75"
                  alt="App Store"
                  height="40"
                />
              </a>
              <a href="#!" aria-label="Google Play" className="text-center">
                <img
                  src={googlePlayBadge}
                  className="w-75"
                  alt="Google Play"
                  height="40"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
