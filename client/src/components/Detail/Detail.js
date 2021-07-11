import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Image, CloudinaryContext } from 'cloudinary-react';
import API from '../../utils/API';
import Map from '../Map/Map';
import './style.css';

function Detail(props) {
    const [upload, setUploads] = useState([props])
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
                            <Image src={upload.imageurl} />
                        </div>
                        <div className='details'>
                            <div className='map'>
                                <div className='mapid'>
                                    <Map />
                                </div>
                            </div>
                            <p>notes and such will go here soon</p>
                        </div>
                    </div>

                </div>

            </div>
        </CloudinaryContext >
    )
}

export default Detail;

