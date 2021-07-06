import React from 'react';
import API from '../../utils/API';
import './style.css';

class Upload extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            files: null,
            imageurl: null,
            imageAlt: null,
        }
        this.handleImageUpload = this.handleImageUpload.bind(this)
    }

    handleImageUpload = () => {
        const { files } = document.querySelector('input[type="file"]')
        const formData = new FormData();
        formData.append('file', files[0]);
        formData.append('upload_preset', process.env.REACT_APP_upload_preset);
        const options = {
            method: 'POST',
            body: formData,
        };

        return fetch('https://api.Cloudinary.com/v1_1/fung-id/image/upload', options)
            .then(res => res.json())
            .then(res => {
                console.log(res);
                this.setState({
                    imageurl: res.url,
                    latitude: res.image_metadata.GPSLatitude,
                    longitude: res.image_metadata.GPSLongitude,
                    created: res.image_metadata.CreateDate
                })
            })

            .then(res => {
                API.saveUpload({
                    imageurl: this.state.imageurl,
                    latitude: this.state.latitude,
                    longitude: this.state.longitude,
                    created: this.state.created
                })
                    .then(this.props.loadUploads)
            })



    }

    render() {
        return (
            <section className='image-upload'>
                <div className='image-upload-form'>
                    <input
                        type='file'
                        accept='image/*'/>
                </div>
                <button
                    type='button'
                    className='image-upload-button'
                    onClick={this.handleImageUpload}>
                    submit
                </button>
            </section>
        );
    }
}

export default Upload;