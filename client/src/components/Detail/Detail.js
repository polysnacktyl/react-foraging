import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useParams, useHistory } from 'react-router-dom';
import { Context } from '../../utils/Reducer';
import { Image, CloudinaryContext } from 'cloudinary-react';
import { Dropdown } from 'react-bootstrap';
import NewModal from '../NewModal/EditModal.js';
import Map from '../Map/Map';
import './style.css';

function Detail() {
    const { id } = useParams();
    const history = useHistory();
    const { state, dispatch } = useContext(Context);
    const [images, setImages] = useState([])
    const [isLoading, setLoading] = useState(true);
    const [date, setDate] = useState([]);
    //eslint-disable-next-line
    const [coords, setCoords] = useState();
    const [common, setCommon] = useState();
    const idquery = id;

    const success = async () => {
        const res = await axios({
            url: `https://react-forager.herokuapp.com/auth/detail`, params: { _id: idquery }
        })

        dispatch({
            type: 'fetchSuccess',
            payload: res.data[0]
        })

        setImages(res.data[0].imageurl);
        const messyDate = (res.data[0].created.split(':'));
        setDate(messyDate[1] + '/' + messyDate[2] + '/' + messyDate[0]);
        setCoords(res.data[0].latitude + ', ' + res.data[0].longitude);
        setCommon(res.data[0].commonNames);
    };

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
                url: 'https://react-forager.herokuapp.com/auth/delete',
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
            <div className='loading-detail'>
                ...loading
            </div>)
    } else {
        return (
            <CloudinaryContext >
                <div className='content-container'>
                    <div className='detail-container'>
                        <div className='top-row'>
                            <div className='details'>
                                <div className='detail-title'>

                                    <li className='tag-one'>
                                        <h5 className='image-title'>{state.images.name}</h5>
                                    </li>
                                </div>


                                <div className='detail-thumbnail'>
                                    <Image src={images} alt={images.alt} />
                                </div>
                            </div>
                            <div className='notes'>
                                <div className='edit-outer'>

                                    <div className='edit'>
                                        <Dropdown>
                                            <Dropdown.Toggle variant='light' id="dropdown-basic">
                                                •••
                                            </Dropdown.Toggle>

                                            <Dropdown.Menu>
                                                <div className='edit-newmodal'>
                                                    <NewModal loadImage={loadImage}/>
                                                </div>
                                                <Dropdown.Item>
                                                    <p onClick={deleteImage}>delete this image from my collection</p>
                                                </Dropdown.Item>
                                            </Dropdown.Menu>
                                        </Dropdown>

                                    </div>
                                </div>
                                <ul>
                                    <li><h5>found: </h5>{date}</li>
                                    <li><h5>species: </h5>{state.images.name}</li>
                                    <li><h5>aka: </h5>
                                        {common.length ? (
                                            <div>
                                                {common.map((name, i) => {
                                                    return (
                                                        <div key={i}>
                                                            {name}
                                                        </div>
                                                    )
                                                })
                                                }
                                            </div>) : (
                                            <p></p>
                                        )}

                                    </li>
                                    <li><h5>notes:</h5>{state.images.notes}</li>
                                </ul>
                            </div>
                        </div>
                        <div className='detail-map'>
                            <Map />
                        </div>
                    </div>

                </div>


            </CloudinaryContext >


        )
    }
};

export default Detail;

