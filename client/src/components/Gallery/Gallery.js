import React, { useState, useEffect, useContext } from "react";
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Image, CloudinaryContext } from 'cloudinary-react';
import { Context } from '../../utils/Reducer';
import Upload from '../Upload/Upload';
import './style.css';


function Gallery() {
    const { state, dispatch } = useContext(Context);
    const [isLoading, setLoading] = useState(true);
    const [images, setImages] = useState([]);
    const user = state.user;
    console.log(state.user);
    const success = async () => {
        const res = await axios({
            url: 'http://localhost:3000/auth/mine', params: {user: user}
        });

        setImages(res.data)

        dispatch({
            type: 'fetchSuccess',
            payload: res.data,

        })

    }

    const fail = (error) =>
        dispatch({
            type: 'fetchFail',
            payload: { error: error.message }
        });


    function loadImages() {
        setTimeout(async () => {
            try {
                await success();
                console.log(user);
                setLoading(false)
            } catch (error) {
                await fail(error);
            }
        }, 200);
    }

    useEffect(() => {
        loadImages()
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
                            {images.length ? (
                                <div key={images.id}
                                    className='thumbnails-inner'>
                                    {images.reverse().map(images => (
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


