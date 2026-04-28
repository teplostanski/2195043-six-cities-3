import {
  Icon,
  layerGroup,
  Map as LeafletMap,
  Marker,
  TileLayer,
} from 'leaflet';
import { useEffect, useRef } from 'react';
import type { OfferPreview } from '../shared/types';

type MapProps = {
  city: OfferPreview['city'];
  offers: OfferPreview[];
  activeOfferId?: string | null;
  className?: string;
};

const DEFAULT_CUSTOM_ICON = new Icon({
  iconUrl: '/img/pin.svg',
  iconSize: [27, 39],
  iconAnchor: [13.5, 39],
});

const ACTIVE_CUSTOM_ICON = new Icon({
  iconUrl: '/img/pin-active.svg',
  iconSize: [27, 39],
  iconAnchor: [13.5, 39],
});

function Map({
  city,
  offers,
  activeOfferId = null,
  className = 'cities__map map',
}: MapProps) {
  const mapRef = useRef<HTMLElement | null>(null);
  const mapInstanceRef = useRef<LeafletMap | null>(null);

  useEffect(() => {
    if (mapRef.current !== null && mapInstanceRef.current === null) {
      const map = new LeafletMap(mapRef.current, {
        center: {
          lat: city.location.latitude,
          lng: city.location.longitude,
        },
        zoom: city.location.zoom,
      });

      const tileLayer = new TileLayer(
        'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        {
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        },
      );

      map.addLayer(tileLayer);
      mapInstanceRef.current = map;
    }

    return () => {
      mapInstanceRef.current?.remove();
      mapInstanceRef.current = null;
    };
  }, [city.location.latitude, city.location.longitude, city.location.zoom]);

  useEffect(() => {
    const map = mapInstanceRef.current;

    if (map) {
      map.setView(
        [city.location.latitude, city.location.longitude],
        city.location.zoom,
      );
    }
  }, [city.location.latitude, city.location.longitude, city.location.zoom]);

  useEffect(() => {
    const map = mapInstanceRef.current;

    if (!map) {
      return;
    }

    const markersLayer = layerGroup().addTo(map);

    offers.forEach((offer) => {
      const marker = new Marker(
        [offer.location.latitude, offer.location.longitude],
        {
          icon:
            activeOfferId !== null && offer.id === activeOfferId
              ? ACTIVE_CUSTOM_ICON
              : DEFAULT_CUSTOM_ICON,
        },
      );

      marker.addTo(markersLayer);
    });

    return () => {
      map.removeLayer(markersLayer);
    };
  }, [offers, activeOfferId]);

  return <section className={className} ref={mapRef}></section>;
}

export default Map;
