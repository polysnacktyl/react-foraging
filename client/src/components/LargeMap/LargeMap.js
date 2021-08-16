import axios from 'axios';
import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Context } from '../../utils/Reducer';
import './LargeMap.css';

function LargeMapp(props) {
    const [isLoading, setLoading] = useState(true);
    const [points, setPoints] = useState([]);
    const [uniquePoints, setUniquePoints] = useState([]);
    const [selectedPoints, setSelectedPoints] = useState([]);
    const [center, setCenter] = useState([]);
    const [zoom, setZoom] = useState('');
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
        setSelectedPoints(res.data);
        setUniquePoints(unique);
        setCenter([res.data[0].latitude, res.data[0].longitude]);
        setZoom(15);
    };

    async function handleChangePoints(e) {
        const thisMushroom = e.target.innerHTML;
        const res = await axios({
            url: 'http://localhost:3000/auth/locate', params: { user: user, tags: thisMushroom }
        })

        setSelectedPoints(res.data);
        setUniquePoints(unique);
        setCenter([res.data[0].latitude, res.data[0].longitude]);
    };

    function handleClearSelection() {
        setSelectedPoints(points);
        setCenter([points[0].latitude, points[0].longitude]);
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

    console.log(
        'points:', points.length,
        'uniquePoints:', uniquePoints.length,
        'selectedPoints:', selectedPoints.length,
        'centerCoords:', [center]
    );


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
                        ) : (
                            <div>
                                <p>nothin here</p>
                            </div>
                        )}
                        <div className='clear-selection'>
                            <li onClick={handleClearSelection}>clear selection</li>
                        </div>
                    </div>
                    <div className='mapid' >
                        <div className='leaflet-container-large'>
                            <MapContainer
                                key={JSON.stringify(center)}
                                className='map-container'
                                center={center}
                                zoom={zoom}
                                scrollWheelZoom={true}>
                                <TileLayer
                                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                />

                                {selectedPoints.map((point, i) => (
                                    <Marker key={i} position={[point.latitude, point.longitude]}>
                                        <Popup>
                                            <img src={point.thumbnail} style={{ width: 300, borderRadius: 10 }} alt={point.alt} />
                                            <Link to={`/detail/${point._id}`}><p className='popup-text'>{point.tags[0]}</p></Link>
                                        </Popup>
                                    </Marker>
                                ))}

                            </MapContainer>
                    </div>
                </div>
            </div>
            </div >
        )
    };
};


export default LargeMapp;

