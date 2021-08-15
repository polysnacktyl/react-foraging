import React, { useState, useEffect, useContext } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { Context } from '../../utils/Reducer';
import { Image, CloudinaryContext } from 'cloudinary-react';
import Map from '../Map/Map';
import './style.css';
import axios from 'axios';

function Detail(props) {
    const { id } = useParams();
    const history = useHistory();
    const { dispatch } = useContext(Context);
    const [images, setImages] = useState([props])
    const [isLoading, setLoading] = useState(true);
    const [tags, setTags] = useState([]);
    const idquery = id;

    const success = async () => {
        const res = await axios({
            url: `http://localhost:3000/auth/detail`, params: { _id: idquery }
        })

        dispatch({
            type: 'fetchSuccess',
            payload: res.data[0]
        })
        setImages(res.data[0].imageurl);
        setTags(res.data[0].tags);
    }

    const fail = (error) =>
        dispatch({
            type: 'fetchFail',
            payload: { error: error.message }
        });

    function loadImage() {
        setTimeout(async () => {
            try {
                await success();
                setLoading(false);
            } catch (error) {
                await fail(error);
            }
        }, 0);
    }

    async function deleteImage() {
        console.log(idquery);
        try {
            await axios({
                method: 'DELETE',
                url: 'http://localhost:3000/auth/delete',
                params: { _id: idquery }
            })

                .then(history.push('/gallery'))

        } catch (err) { console.error(err.message) };

    }

    useEffect(() => {
        loadImage()
        // eslint-disable-next-line
    }, []);

    if (isLoading) {
        return (
            <div className='loading-detail'>...loading</div>)
    } else {
        return (
            <CloudinaryContext >
                <div className='content-container'>
                    <div className='detail-container'>
                        <div className='detail-thumbnail'>
                            <div className='detail-image'>
                                <Image src={images} alt={images.alt} />
                                <button onClick={deleteImage}>delete</button>
                            </div>
                            <div className='details'>
                                <div className='map'>
                                    <div className='mapid'>
                                        <Map />
                                    </div>
                                </div>

                                {tags.length ? (
                                    <div key={tags.id} className='tags'>
                                        <ul>
                                            {tags.map((tag, i) => (
                                                <li key={i} className='tag-one'>{tag}</li>))}
                                        </ul>
                                    </div>) : (
                                    <div><p>no tags</p></div>)}

                            </div>
                        </div>

                    </div>

                </div>
            </CloudinaryContext >


        )
    }
};

export default Detail;

