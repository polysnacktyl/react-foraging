import axios from 'axios';
import React, { useEffect, useState, useContext } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Context } from '../../utils/Reducer';
import './LargeMap.css';

function LargeMapp(props) {
    const [isLoading, setLoading] = useState(true);
    const [points, setPoints] = useState([]);
    const [selectedPoints, setSelectedPoints] = useState([]);
    const { state, dispatch } = useContext(Context);
    const user = state.user;
    const unique = [...new Set(points.map(item => item.tags[0]))];

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
    console.log(selectedPoints);


    async function handleChangePoints(e) {
        const thisMushroom = e.target.innerHTML;
        console.log(thisMushroom);
        const res = await axios({
            url: 'http://localhost:3000/auth/locate', params: { user: user, tags: thisMushroom }
        })
        setSelectedPoints(res.data);
    }

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
                                        <li onClick={handleChangePoints}>{point}</li>
                                    </div>
                                ))}
                            </div>
                        ) : (<div><p>nothin here</p></div>)}
                    </div>
                    <div className='mapid' >
                        <div className='leaflet-container-large'>
                            <MapContainer
                                className='map-container'
                                center={[points[0].latitude, points[0].longitude]}
                                zoom={7}
                                scrollWheelZoom={true}>
                                <TileLayer
                                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                />

                                {points.map((point, i) => (
                                    <Marker key={i} position={[point.latitude, point.longitude]}>
                                        <Popup>
                                            <img src={point.thumbnail} style={{ width: 200, borderRadius: 10 }} alt={point.alt} />
                                            <p className='popup-text'>{point.tags[0]}</p>
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

