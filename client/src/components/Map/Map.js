import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import API from '../../utils/API';
import './Map.css';

function Mapp(props) {
    const [isLoading, setLoading] = useState(true);
    const [coords, setCoords] = useState();
    const { id } = useParams();

    useEffect(() => {
        API.getUpload(id)
            .then(res => {
                setCoords(res.data)
                setLoading(false);
            });
        // eslint-disable-next-line 
    }, []);

    if (isLoading) {
        return (
            <div>...loading</div>
        )
    }

    return (
        <div className='mapid' >
            <MapContainer
                center={[coords.latitude, coords.longitude]}
                zoom={16}
                scrollWheelZoom={true}>
                <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={[coords.latitude, coords.longitude]}>
                    <Popup>
                        popup text
                    </Popup>
                </Marker>
            </MapContainer>

        </div>
    )
}


export default Mapp;

