import React, { useState, useEffect, useContext, useCallback } from "react";
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Image, CloudinaryContext } from 'cloudinary-react';
import { Context } from '../../utils/Reducer';
import Upload from '../Upload/Upload';
import './style.css';

function Gallery() {
    const [isLoading, setLoading] = useState(true);
    const { state, dispatch } = useContext(Context);
    const user = state.user;
    const [uploads, setUploads] = useState([]);

    const success = async () => {
        const res = await axios.post('http://localhost:3000/auth/mine', {
            user
        });
        console.log(res.data);
        dispatch({
            type: 'fetchSuccess',
            payload: { images: res.data }
        })
        setUploads(res.data)
    }

    const loadImages = useCallback(() => {
        dispatch({ type: 'fetchImages' });
        setTimeout(async () => {
            try {
                await success();
            } catch (error) {
                console.log(error);
            }
        }, 1000);
    }, []);

    useEffect(() => {
        loadImages()
        setLoading(false)
        //eslint-disable-next-line
    }, [])

    if (isLoading) {
        return (<div className='loading'>...loading</div>)
    } else {

        return (
            <CloudinaryContext cloudName="fung-id">
                <div className='content-container'>
                    <div className='gallery'>
                        <div className='images'>
                            {uploads.length ? (
                                <div key={uploads.id}
                                    className='thumbnails-inner'>
                                    {uploads.reverse().map(images => (
                                        <div key={images._id}
                                            className='image-one'>
                                            <Link
                                                to={`/detail/${images._id}`}>
                                                <Image
                                                    key={images._id}
                                                    src={images.thumbnail}
                                                    latitude={images.latitude}
                                                    longitude={images.longitude}
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
                            <Upload loadImages={loadImages} />
                        </div>
                    </div>
                </div>
            </CloudinaryContext >
        )

    }
};

export default Gallery;


