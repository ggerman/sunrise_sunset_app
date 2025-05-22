import React from "react";
import logo from "./assets/images/logo_header.jpg"

import { useTranslation } from "react-i18next"

function Header() {
    const {t, i18n} = useTranslation();

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
    };

    return (
        <div>
            <img src={logo} alt="Logo" />
            <nav className="menu">
              <ul className="menu-list">
                <li><a href="/">{t('home')}</a></li>
                <li><a href="/about">{t('about')}</a></li>
                <li><a href="/vehicles">{t('vehicles')}</a></li>
                <li><a href="/contact">{t('contact')}</a></li>
              </ul>

                <button onClick={() => changeLanguage('en')}>English</button>
                <button onClick={() => changeLanguage('es')}>Español</button>
            </nav>
        </div>
    )
}

export default Header;
