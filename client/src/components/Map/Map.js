import React, { useEffect, useState, useContext } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Context } from '../../utils/Reducer';
import './Map.css';

function Mapp() {
    const [isLoading, setLoading] = useState(true);
    const [latitude, setLatitude] = useState();
    const [longitude, setLongitude] = useState();
    const [coords, setCoords] = useState();
    const [popUp, setPopUp] = useState();
    const { state } = useContext(Context);

    useEffect(() => {
        setLatitude(state.images.latitude);
        setLongitude(state.images.longitude);
        setPopUp(state.images.commonNames[0]);
        setLoading(false);
        setCoords(state.images.latitude + ',' + state.images.longitude);
        // eslint-disable-next-line 
    }, []);


    if (isLoading) {
        return (
            <div>...loading</div>
        )
    } else {

        return (
            <div className='mapid' >
                <MapContainer
                    center={[latitude, longitude]}
                    zoom={17}
                    scrollWheelZoom={true}>
                    <TileLayer
                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Marker position={[latitude, longitude]}>
                        <Popup>
                            <a href={`https://www.google.com/maps?q=${coords}`} target={'_blank'} rel={'noopener noreferrer'}>directions</a>
                        </Popup>
                    </Marker>
                </MapContainer>

            </div >
        )
    }
}


export default Mapp;

