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

    function handleFormSubmit(event) {
        event.preventDefault();
        API.saveUpload({
            imageurl: this.state.imageurl,
            latitude: this.state.latitude,
            longitude: this.state.longitude,
            created: this.state.created
        })
    };

    return (
        <CloudinaryContext cloudName="fung-id" >
            <div className='content-container'>
                <div className='gallery'>
                    <div className='images'>
                        {uploads.length ? (
                            <div key={uploads.id}
                                className='uploads-each'>
                                {uploads.reverse().map(uploads => (
                                    <div key={uploads._id}
                                        className='image-one'>
                                        <Link
                                            to={`/detail/${uploads._id}`}
                                            imageurl={uploads.imageurl}>
                                            <Image
                                                key={uploads._id}
                                                src={uploads.imageurl} />
                                        </Link>
                                    </div>
                                ))}
                            </div>


                        ) : (
                            <p>
                                <span
                                    role='img'
                                    aria-label='mushroom emoji'>
                                    🍄
                                </span>
                            </p>
                        )}
                    </div>


                    <div className='image-upload-area'>
                        <form>
                            <Upload onSubmit={handleFormSubmit} loadUploads={loadUploads} />
                        </form>
                    </div>
                </div>
            </div>
        </CloudinaryContext>
    )
};




export default Gallery;
