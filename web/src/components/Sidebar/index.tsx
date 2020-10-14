import React from 'react';
import { FiArrowLeft } from 'react-icons/fi';

import mapMarkerImg from '../../assets/images/map-market.svg';

import './styles.css';

import { useHistory } from 'react-router-dom';

export default function Sidebar(): JSX.Element {
  const { goBack } = useHistory();
  return (
    <aside className="app-sidebar">
      <img src={mapMarkerImg} alt="Happy" />

      <footer>
        <button type="button" onClick={goBack}>
          <FiArrowLeft size={24} color="#FFF" />
        </button>
      </footer>
    </aside>
  );
}
