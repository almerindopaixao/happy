import React from 'react';
import { Link } from 'react-router-dom';

import './styles.css';

import success from '../../assets/images/success.svg';

export default function CreateOrphanageSuccess(): JSX.Element {
  return (
    <div id="page-success">
      <div className="content-wrapper">
        <main>
          <h1>Ebaaa!</h1>
          <p>O cadastro deu certo e ja está disponível no maps {': )'}</p>
          <Link className="return-map" to="/app">
            Voltar para o mapa
          </Link>
        </main>
        <img src={success} alt="success" />
      </div>
    </div>
  );
}
