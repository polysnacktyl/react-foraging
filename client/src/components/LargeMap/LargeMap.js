import axios from 'axios';
import React, { useEffect, useState, useContext } from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Context } from '../../utils/Reducer';
import './LargeMap.css';

function LargeMapp(props) {
    const [isLoading, setLoading] = useState(true);
    const [points, setPoints] = useState([]);
    //eslint-disable-next-line
    const [uniqueByName, setUniqueByName] = useState([]);
    //eslint-disable-next-line
    const [uniqueByCommon, setUniqueByCommon] = useState([]);
    const [selectedPoints, setSelectedPoints] = useState([]);
    const [center, setCenter] = useState([]);
    const [zoom, setZoom] = useState('');
    const [sort, setSort] = useState('name');
    const { state, dispatch } = useContext(Context);
    const user = state.user;
    const uniqueName = [...new Set(points.map(item => item.name))];
    const uniqueCommon = [...new Set(points.map(item => item.commonNames[0]))];
    const urlBase = process.env.REACT_APP_API_URL;


    const success = async () => {
        const res = await axios({
            url: `${urlBase}/auth/mine`, params: { user: user }
        });

        dispatch({
            type: 'fetchSuccess',
            payload: res.data
        })


        setPoints(res.data);
        setSelectedPoints(res.data);
        setUniqueByName(uniqueName);
        setCenter([res.data[0].latitude, res.data[0].longitude]);
        setZoom(15);
    };

    async function handleChangePoints(e) {
        let name;
        let common;
        if (sort === 'name') { name = e.target.innerHTML; common = null; };
        if (sort === 'common') { name = null; common = e.target.innerHTML; console.log(common) };
        const res = await axios({
            url: `${urlBase}/auth/locate`, params: { user: user, name: name, commonNames: common }
        })
        console.log(res.data);
        console.log(points);
        setSelectedPoints(res.data);
        setUniqueByName(uniqueName);
        setUniqueByCommon(uniqueCommon);
        setCenter([res.data[0].latitude, res.data[0].longitude]);
    };

    function toggleSort() {
        if (sort === 'name') {
            setSort('common');
        };
        if (sort === 'common') {
            setSort('name');
        };
    };


    let sortPoints;
    if (sort === 'name') {
        sortPoints = uniqueName.map((point, i) => {
            if (uniqueName.length === 0) { return <div>...</div> };
            if (point === undefined) { return null };
            return (
                <div key={i}>
                    <li onClick={handleChangePoints}>{point}</li>
                </div>
            )
        })
    } else {
        sortPoints = uniqueCommon.map((point, i) => {
            if (uniqueCommon.length === 0) { return (<div>...</div>) };
            return (
                <div key={i}>
                    <li onClick={handleChangePoints}>{point}</li>
                </div>
            )
        });
    }

    function handleClearSelection() {
        setSelectedPoints(points);
        setCenter([points[0].latitude, points[0].longitude]);
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
    };

    useEffect(() => {
        loadCoords();
        // eslint-disable-next-line 
    }, []);


    if (isLoading) {
        return (
            <div>
                ...loading
            </div>
        )
    } else {
        return (
            <div className='content-container'>
                <div className='large-map-view'>
                    <div className='all-tags'>
                        <h4>tags</h4>
                        <div className='tags-div'>
                            <div className='sort-button'>
                                <Button size='sm' onClick={toggleSort}>toggle sort</Button>
                            </div>
                            {sortPoints}
                        </div>

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
                                            <Link to={`/detail/${point._id}`}><p className='popup-text'>{point.name || point.commonNames[0]}</p></Link>
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

