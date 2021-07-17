import React from 'react';
import tester from '../assets/images/tester.svg';
import './style.css';

const Home = () => {

    return (
        <div className='content-container'>
            <div className='welcome'>
                <img src={tester} alt='mushroom'></img>
                <p>i'm a pretty fungi</p>
            </div>

        </div>
    )
};

export default Home;