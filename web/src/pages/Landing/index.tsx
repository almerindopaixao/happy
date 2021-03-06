import React from 'react';
import { Link } from 'react-router-dom';

import { FiArrowRight } from 'react-icons/fi';

import './styles.css';

import logoImg from '../../assets/images/logo.svg';

export default function Landing(): JSX.Element {
  return (
    <div id="page-landing">
      <div className="content-wrapper">
        <div className="content-logo">
          <img src={logoImg} alt="Logo Happy" />
          <div className="location">
            <strong>Bahia</strong>
            <span>Entre-Rios</span>
          </div>
        </div>

        <main>
          <h1>Leve felicidade para o mundo</h1>
          <p>Visite orfanatos e mude o dia de muitas crianças.</p>
        </main>

        <Link to="/dashboard" className="login-app">
          Acesso restrito
        </Link>

        <Link to="/app" className="enter-app">
          <FiArrowRight size={26} color="rgba(0, 0, 0, 0.6)" />
        </Link>
      </div>
    </div>
  );
}
