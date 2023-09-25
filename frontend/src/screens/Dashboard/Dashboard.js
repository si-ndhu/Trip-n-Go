// Author: Rahul Saliya

import { Row, Col, Container } from 'react-bootstrap';
import './Dashboard.css';
import React from 'react';
import TripItem from 'components/TripItem';
import { popularTrips, tripsNearYou } from './TripItems';
import axios from 'axios';
import APIs from 'Constants';
import { useNavigate } from 'react-router-dom';


function Dashboard() {
    const [filteredPopularTrips, setFilteredPopularTrips] = React.useState(popularTrips);
    const [filteredTripsNearYou, setFilteredTripsNearYou] = React.useState(tripsNearYou);
    const [searchText, setSearchText] = React.useState('');
    const navigate = useNavigate();

    const onSearchTextChange = (e) => {
        if (e.target.value.length > 50) {
            return;
        }
        setSearchText(e.target.value);
        const filteredPopularTrips = popularTrips.filter((trip) => {
            return trip.title.toLowerCase().includes(e.target.value.toLowerCase());
        });
        const filteredTripsNearYou = tripsNearYou.filter((trip) => {
            return trip.title.toLowerCase().includes(e.target.value.toLowerCase());
        });
        setFilteredPopularTrips(filteredPopularTrips);
        setFilteredTripsNearYou(filteredTripsNearYou);
    };

    React.useEffect(() => {
        axios.get(APIs.POPULAR_TRIPS)
            .then((res) => {
                setFilteredPopularTrips(res.data.trips);
            })
            .catch((err) => {
                console.log(err);
            });

        axios.get(APIs.TRIPS_NEAR_YOU)
            .then((res) => {
                setFilteredTripsNearYou(res.data.trips);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    // Images by barnyc: https://flickr.com/photos/75487768@N04/31628278140/in/photolist-QbTcbm-naDN9o-8tF7Y3-bpQQFi-DDnvj9-hnwqti-JRMGJH-N9vpzy-MoREwn-23mWx8L-27HZbNM-PzxcXy-dkdGBH-MC55mp-CRe2wH-ddngBy-5pBL9K-aimadp-atdUU9-6KBNJ3-fnqbB2-7kPfy7-9yQB4D-27yjzhM-26h2CDK-Zow8Ti-SwsNoj-7mLDRp-T9MWwY-21LYYPn-25X7Hrm-Xx4bVM-GWeFwT-Jn58bR-DGZcAy-E8i7yj-uxLmC3-bBeBGg-bB2AyU-DKb97-KxECR9-Gcrv2e-oVgqQC-28MX46G-yJVjVY-Xvs96Y-Q2kHof-pcJooL-W9WpXW-Gw2QEA/
    const popular_trips_images = [
        "https://live.staticflickr.com/7460/13892714966_ae06a2ee97_c_d.jpg",
        "https://live.staticflickr.com/4115/4907675570_b3f712812e_c_d.jpg",
        "https://live.staticflickr.com/7009/6833376215_fc29930224_c_d.jpg",
    ];

    const near_by_trips_images = [
        "https://live.staticflickr.com/401/31628278140_17bb9f1fd8_c_d.jpg",
        "https://live.staticflickr.com/5737/30288680862_5c9e8248f4_c_d.jpg",
        "https://live.staticflickr.com/5537/31228301162_8dddd9450d_c_d.jpg"
    ];
    const onSearchClick = (e) => {
        e.preventDefault();
        if (searchText.length === 0) {
            return;
        }
        navigate('/moretrips/?searchText=' + searchText);
    };

    const handleMoreTripsClick = (target) => {
        navigate('/moretrips/?tripType=' + target.toLowerCase());
    };

    return (
        <div className='dashboard-container'>
            <div className="carousel-container" >
                <div className="carousel-image" style={{ backgroundImage: `url(https://live.staticflickr.com/4556/24708106728_3d933d30d9_k_d.jpg)` }} />
                {/* Image by barnyz: https://flickr.com/photos/75487768@N04/24708106728/in/photolist-QbTcbm-naDN9o-8tF7Y3-bpQQFi-DDnvj9-hnwqti-JRMGJH-N9vpzy-MoREwn-23mWx8L-27HZbNM-PzxcXy-dkdGBH-MC55mp-CRe2wH-ddngBy-5pBL9K-aimadp-atdUU9-6KBNJ3-fnqbB2-7kPfy7-9yQB4D-27yjzhM-26h2CDK-Zow8Ti-SwsNoj-7mLDRp-T9MWwY-21LYYPn-25X7Hrm-Xx4bVM-GWeFwT-Jn58bR-DGZcAy-E8i7yj-uxLmC3-bBeBGg-bB2AyU-DKb97-KxECR9-Gcrv2e-oVgqQC-28MX46G-yJVjVY-Xvs96Y-Q2kHof-pcJooL-W9WpXW-Gw2QEA/ */}
                <div className="carousel-overlay">
                    <span className="carousel-title">Let the Journey Begin!</span>
                    <span className="carousel-text">Experience the World Your Way: Tailored Trips for Unforgettable Memories!</span>
                </div>
            </div>
            <Row className='search-container'>
                <Col lg={6} md={6}>
                    <input className="search-input" type="text" placeholder="Search" onChange={onSearchTextChange} maxLength={50} />
                </Col>
                <Col lg={1} md={2}>
                    <button className="button button-primary button-md-100p"
                        onClick={onSearchClick}
                    >Search</button>
                </Col>
            </Row>

            <div className="trips-container">
                <h1 className="title">Most popular trips</h1>
                <Container className='trips-item-container'>
                    <Row className="g-4 justify-content-md-center">
                        {
                            filteredPopularTrips.length === 0 ?
                                <span className='noTrip'>No trip found</span>
                                :
                                Array.from({ length: Math.min(3, filteredPopularTrips.length) }).map((_, idx) => (
                                    <Col key={idx}>
                                        <TripItem trip={{
                                            image: popular_trips_images[idx],
                                            ...filteredPopularTrips[idx]
                                        }} />
                                    </Col>
                                ))
                        }
                    </Row>
                </Container>
                <div className='button-container'>
                    <button className={`button button-primary button-200 button-sm-100p ${filteredPopularTrips.length === 0 ? 'disabled' : ''}`}
                        onClick={() => { handleMoreTripsClick("popular") }}
                    >More Trips</button>
                </div>
            </div>

            <div className="trips-container">
                <h1 className="title">Trips near you</h1>
                <Container className='trips-item-container'>
                    <Row className="g-4 justify-content-md-center">
                        {
                            filteredTripsNearYou.length === 0 ?
                                <span className='noTrip'>No trip found</span>
                                :
                                Array.from({ length: Math.min(3, filteredTripsNearYou.length) }).map((_, idx) => (
                                    <Col key={idx}>
                                        <TripItem trip={{
                                            image: near_by_trips_images[idx],
                                            ...filteredTripsNearYou[idx]
                                        }} />
                                    </Col>
                                ))}
                    </Row>
                </Container>
                <div className='button-container'>
                    <button className={`button button-primary button-200 button-sm-100p ${filteredTripsNearYou.length === 0 ? 'disabled' : ''}`}
                        onClick={() => { handleMoreTripsClick("nearby") }}
                    >More Trips</button>
                </div>
            </div>

        </div >
    );
}

export default Dashboard;
