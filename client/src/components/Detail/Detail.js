import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Image, CloudinaryContext } from 'cloudinary-react';
import API from '../../utils/API';
import './style.css';

function Detail(props) {
    const [uploads, setUploads] = useState({})
    const { id } = useParams()

    useEffect(() => {
        API.getUpload(id)
            .then(res => setUploads(res.data))
            .catch(err => console.log(err))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <CloudinaryContext>
            <div className='content-container'>
                <div className='detail-thumbnail'>
                    <div className='detail-image'>
                        <Image src={uploads.imageurl} />
                    </div>
                </div>
            </div>
        </CloudinaryContext>
    )
}

export default Detail;