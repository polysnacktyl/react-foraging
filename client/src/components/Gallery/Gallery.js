import React, { useState, useEffect, useContext } from "react";
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Image, CloudinaryContext } from 'cloudinary-react';
import { Context } from '../../utils/Reducer';
import Upload from '../Upload/Upload';
import './style.css';

function Gallery(props) {
    const [uploads, setUploads] = useState([])
    const { state } = useContext(Context);
    const { user } = state.user;

    useEffect(() => {
        loadUploads()
        //eslint-disable-next-line
    }, [])

    async function loadUploads() {
        axios.post('http://localhost:3000/auth/mine', {
            user
        })
            .then(res => setUploads(res.data))
            .catch(error => console.log(error.response));
    }

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
                        <Upload />
                    </div>
                </div>
            </div>
        </CloudinaryContext >
    )

};

export default Gallery;


