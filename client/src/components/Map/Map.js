import React from 'react';
import ReactMapboxGl, { Layer, Feature } from 'react-mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

const Map = ReactMapboxGl({ accessToken: process.env.REACT_APP_mapBox_accessToken });

function Mapp(props) {

    const longitude = props.longitude
    const latitude = props.latitude

    return (
        < Map
            // eslint-disable-next-line
            style="mapbox://styles/mapbox/streets-v9"
            containerStyle={{
                height: '60vh',
                width: '45vw',
                borderRadius: '15px'
            }}>

            <Layer type="symbol" id="marker" layout={{ 'icon-image': 'marker-15' }}>
                <Feature coordinates={[latitude, longitude]} />
            </Layer>
        </Map >
    )
}

export default Mapp;