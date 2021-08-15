import axios from 'axios';
import React, { useEffect, useState, useContext } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Context } from '../../utils/Reducer';
import './LargeMap.css';

function LargeMapp() {
    const [isLoading, setLoading] = useState(true);
    const [points, setPoints] = useState([]);
    const { state, dispatch } = useContext(Context);
    const user = state.user;

    const success = async () => {
        const res = await axios({
            url: 'http://localhost:3000/auth/mine', params: { user: user }
        });

        dispatch({
            type: 'fetchSuccess',
            payload: res.data
        })

        setPoints(res.data);
    };




    function loadCoords() {
        setTimeout(async () => {
            try {
                await success();
                setLoading(false);
            } catch (error) {
                console.log(error);
            }
        }, 0);
    }


    const unique = [...new Set(points.map(item => item.tags[0]))];
    console.log(unique);



    useEffect(() => {
        loadCoords();
        // eslint-disable-next-line 
    }, []);


    if (isLoading) {
        return (
            <div>...loading</div>
        )
    } else {

        return (
            <div className='content-container'>
                <div className='large-map-view'>
                    <div className='all-tags'>
                        <h4>tags</h4>
                        {unique.length ? (
                            <div className='tags-div'>
                                {unique.map((point, i) => (
                                    <div key={i}>
                                        <li>{point}</li>
                                    </div>
                                ))}
                            </div>
                        ) : (<div><p>nothin here</p></div>)}
                    </div>
                    <div className='mapid' >
                        <div className='leaflet-container-large'>
                            <MapContainer
                                className='map-container'
                                center={[points[1].latitude, points[1].longitude]}
                                zoom={10}
                                scrollWheelZoom={true}>
                                <TileLayer
                                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                />

                                {points.map((point, i) => (
                                    <Marker key={i} position={[point.latitude, point.longitude]}>
                                        <Popup>
                                            {point.tags}
                                        </Popup>
                                    </Marker>
                                ))}

                            </MapContainer>
                        </div>
                    </div>
                </div>
            </div>
        )
    };
};


export default LargeMapp;

