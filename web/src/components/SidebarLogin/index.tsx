import React from 'react';

import logoLogin from '../../assets/images/logoLogin.svg';

import './styles.css';

export default function SidebarLogin(): JSX.Element {
  return (
    <aside id="login-aside">
      <img src={logoLogin} alt="Logo" />
      <div className="location">
        <strong>Entre-Rios</strong>
        <span>Bahia</span>
      </div>
    </aside>
  );
}
