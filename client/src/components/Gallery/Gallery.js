import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { Image, CloudinaryContext } from 'cloudinary-react';
import Upload from '../Upload/Upload';
import API from '../../utils/API';
import './style.css';

function Gallery() {
    const [uploads, setUploads] = useState([])

    useEffect(() => {
        loadUploads()
    }, [])

    function loadUploads() {
        API.getUploads()
            .then(res =>
                setUploads(res.data),
            )
            .catch(err => console.log(err));
    };

    return (
        <CloudinaryContext cloudName="fung-id">
            <div className='content-container'>
                <div className='gallery'>
                    <div className='images'>
                        {uploads.length ? (
                            <div key={uploads.id}
                                className='thumbnails-inner'>
                                {uploads.reverse().map(uploads => (
                                    <div key={uploads._id}
                                        className='image-one'>
                                        <Link
                                            to={`/detail/${uploads._id}`}>
                                            <Image
                                                key={uploads._id}
                                                src={uploads.thumbnail}
                                                latitude={uploads.latitude}
                                                longitude={uploads.longitude}
                                            />
                                        </Link>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className='empty-gallery'>
                                <p>
                                    <span
                                        role='img'
                                        aria-label='mushroom emoji'>
                                        🍄
                                    </span>
                                    <span> insert some fungus among us--please and thank you </span>
                                    <span
                                        role='img'
                                        aria-label='mushroom emoji'>
                                        🍄
                                    </span>
                                </p>
                            </div>
                        )}
                    </div>
                    <div className='image-upload-area'>
                        <form>
                            <Upload loadUploads={loadUploads} />
                        </form>
                    </div>
                </div>
            </div>
        </CloudinaryContext >
    )
};

export default Gallery;

