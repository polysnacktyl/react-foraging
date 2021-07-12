import React from 'react';
import API from '../../utils/API';
import ModalMega from '../ModalMega';
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

    handleImageUpload = (event) => {
        event.preventDefault()
        const { files } = document.querySelector('input[type="file"]')
        const formData = new FormData();
        formData.append('file', files[0]);
        formData.append('upload_preset', process.env.REACT_APP_upload_preset);
        const options = {
            method: 'POST',
            body: formData,
        };

        return fetch(process.env.REACT_APP_cloudinary_secure_upload, options)
            .then(res => res.json())
            .then(res => {
                console.log(res)
                this.setState({
                    created: res.image_metadata.CreateDate,
                    thumbnail: process.env.REACT_APP_cloudinary_upload + 'c_thumb,w_400/' + res.public_id + '.jpg',
                    imageurl: process.env.REACT_APP_cloudinary_upload + res.public_id + '.jpg',
                    latitude: res.image_metadata.GPSLatitude,
                    longitude: res.image_metadata.GPSLongitude,
                })
            })

            .then(res => {
                if (this.state.latitude !== undefined) {
                    let thisLat = this.state.latitude.split(/[^\d\w.]+/).map((item, i) => {
                        return (
                            <>
                                {item}
                            </>
                        )
                    })
                    let lat1 = parseFloat(thisLat[0].props.children)
                    let lat2 = parseFloat(thisLat[2].props.children / 60)
                    let lat3 = parseFloat(thisLat[3].props.children / 3600)
                    let lat4 = (thisLat[4].props.children)
                    let bigLat = (lat1 + lat2 + lat3).toFixed(6) * 1
                    if (lat4 === 'S') {
                        bigLat = bigLat * -1
                    }
                    this.setState({
                        latitude: bigLat
                    })
                }

                if (this.state.longitude !== undefined) {
                    let thisLon = this.state.longitude.split(/[^\d\w.]+/).map((item, i) => {
                        return (
                            <>
                                {item}
                            </>
                        )
                    })
                    let lon1 = parseFloat(thisLon[0].props.children)
                    let lon3 = parseFloat(thisLon[3].props.children / 3600)
                    let lon2 = parseFloat(thisLon[2].props.children / 60)
                    let lon4 = (thisLon[4].props.children)
                    let bigLon = (lon1 + lon2 + lon3).toFixed(6) * 1

                    if (lon4 === 'W') {
                        bigLon = bigLon * -1
                    }
                    this.setState({
                        longitude: bigLon
                    })
                }
            })

            .then(res => {
                API.saveUpload({
                    created: this.state.created,
                    thumbnail: this.state.thumbnail,
                    imageurl: this.state.imageurl,
                    latitude: this.state.latitude,
                    longitude: this.state.longitude
                })
                    .then(this.props.loadUploads)
            })
    }

    render() {
        return (
            <div>
                <ModalMega handleImageUpload={this.handleImageUpload} />
            </div>


        );
    }
}

export default Upload;
