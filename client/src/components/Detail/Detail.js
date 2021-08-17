import React, { useState, useEffect, useContext } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { Context } from '../../utils/Reducer';
import { Image, CloudinaryContext } from 'cloudinary-react';
import MegaEdit from '../Modal/EditMega';
import Map from '../Map/Map';
import './style.css';
import axios from 'axios';

function Detail(props) {
    const { id } = useParams();
    const history = useHistory();
    const { state, dispatch } = useContext(Context);
    const [images, setImages] = useState([props])
    const [isLoading, setLoading] = useState(true);
    const [tags, setTags] = useState([]);
    const [date, setDate] = useState([]);
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
        const messyDate = (res.data[0].created.split(':'));
        setDate(messyDate[1] + '/' + messyDate[2] + '/' + messyDate[0]);

    }
    console.log(date);

    const fail = (error) =>
        dispatch({
            type: 'fetchFail',
            payload: { error: error.message }
        });

    function handleEditButtonClick(e) {
        console.log(state.images._id);
    }

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
                        <div className='top-row'>
                            <div className='details'>
                                <div className='detail-title'>
                                    {tags.length ? (
                                        <div key={tags.id} className='title'>
                                            <ul>
                                                {tags.map((tag, i) => (
                                                    <li key={i} className='tag-one'><h5 className='image-title'>{tag}</h5></li>
                                                ))}
                                            </ul>
                                        </div>

                                    ) : (
                                        <div>
                                            <p>no tags</p>
                                        </div>)}
                                </div>
                                <div className='detail-thumbnail'>

                                    <Image src={images} alt={images.alt} />

                                </div>

                            </div>
                            <div className='notes'>
                                <div className='edit-button'>
                                    <MegaEdit submit={handleEditButtonClick}/>
                                </div>

                                <ul>
                                    <li><h5>date: </h5>{date}</li>
                                    <li><h5>name: </h5>{state.images.tags}</li>
                                    <li><h5>notes:</h5>...no notes yet</li>
                                </ul>
                                

                            </div>


                        </div>
                        <div className='detail-map'>
                            <Map />
                        </div>
                        <div className='delete-image'>
                            <button onClick={deleteImage}>delete this image from my collection</button>
                            <p className='delete-warning'>this cannot be undone</p>
                        </div>
                    </div>

                </div>


            </CloudinaryContext >


        )
    }
};

export default Detail;

