import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { Map, TileLayer, Marker, Popup } from 'react-leaflet';

import { FiPlus, FiArrowRight } from 'react-icons/fi';

import mapIcon from '../../utils/mapIcon';

import './styles.css';

import mapMarketImg from '../../assets/images/map-market.svg';

import api from '../../services/api';
import Orphanage from '../Orphanage';

interface Images {
  id: number;
  url: string;
}

interface Orphanage {
  id: number;
  name: string;
  about: string;
  images: Images[];
  instructions: string;
  latitude: number;
  longitude: number;
  open_on_weekends: boolean;
  opening_hours: string;
}

export default function OrphanagesMap(): JSX.Element {
  const [orphanages, setOrphanages] = useState<Orphanage[]>([]);

  useEffect(() => {
    api.get('/orphanages').then((response) => {
      setOrphanages(response.data);
    });
  }, []);

  return (
    <div id="page-map">
      <aside>
        <header>
          <Link to="/">
            <img src={mapMarketImg} alt="appy" />
          </Link>

          <h2>Escolha um orfanato no mapa</h2>
          <p>Muitas crianças estão esperando a sua visita</p>
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
        {orphanages.map((orphanage) => {
          return (
            <Marker
              key={orphanage.id}
              icon={mapIcon}
              position={[orphanage.latitude, orphanage.longitude]}
            >
              <Popup
                closeButton={false}
                minWidth={180}
                maxWidth={200}
                maxHeight={50}
                className="map-popup"
              >
                {orphanage.name}
                <Link to={`/orphanages/${orphanage.id}`}>
                  <FiArrowRight size={15} color="#fff" />
                </Link>
              </Popup>
            </Marker>
          );
        })}
      </Map>

      <Link to="/orphanages/create" className="create-orphanage">
        <FiPlus size={32} color="#fff" />
      </Link>
    </div>
  );
}
