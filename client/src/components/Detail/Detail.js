import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Image, CloudinaryContext } from 'cloudinary-react';
import API from '../../utils/API';
import Map from '../Map/Map';
import './style.css';

function Detail(props) {
    const [upload, setUploads] = useState([])
    const { id } = useParams()

    useEffect(() => {
        loadUpload()
        // eslint-disable-next-line
    }, [])

    function loadUpload() {
        API.getUpload(id)
            .then(res =>
                setUploads(res.data))
            .catch(err => console.log(err))
    };

    return (
        <CloudinaryContext >
            <div className='content-container'>
                <div className='detail-container'>
                    <div className='detail-thumbnail'>
                        <div className='detail-image'>
                            <Image
                                src={upload.imageurl} />
                            <div className='details'>
                                <p>coordinates: [{upload.latitude}, {upload.longitude}]</p>
                                <p>found on: {upload.created}</p>
                            </div>
                        </div>
                    </div>
                    <Map
                        latitude={upload.latitude}
                        longitude={upload.longitude}> </Map>
                </div>
            </div>
        </CloudinaryContext>
    )
}

export default Detail;

