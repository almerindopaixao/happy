import React from 'react';
import { Link } from 'react-router-dom';

import { Map, TileLayer } from 'react-leaflet';

import { FiPlus } from 'react-icons/fi';

import 'leaflet/dist/leaflet.css';
import './OrphanagesMap.css';

import mapMarketImg from '../../assets/images/map-market.svg';

export default function OrphanagesMap(): JSX.Element {
  return (
    <div id="page-map">
      <aside>
        <header>
          <img src={mapMarketImg} alt="appy" />

          <h2>Escolha um orfanato no mapa</h2>
          <p>Muitas crianças estão esperando a sua visita :)</p>
        </header>

        <footer>
          <strong>Bahia</strong>
          <span>Entre-Rios</span>
        </footer>
      </aside>
      <Map
        center={[-11.946635, -38.0737231]}
        zoom={15}
        style={{ width: '100%', height: '100%' }}
      >
        {/* TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png" /> */}
        <TileLayer
          url={`https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
        />
      </Map>

      <Link to="#" className="create-orphanage">
        <FiPlus size={32} color="#fff" />
      </Link>
    </div>
  );
}
