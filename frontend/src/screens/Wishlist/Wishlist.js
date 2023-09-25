import { Row, Col, Container } from 'react-bootstrap';
import '../Dashboard/Dashboard.css';
import './Wishlist.css';
import React from 'react';
import { useEffect, useRef } from 'react';
import TripItem from '../../components/TripItem/TripItem';
import { popularTrips, tripsNearYou } from '../Dashboard/TripItems';
import axios from 'axios';
import _ from 'lodash';
import APIs from 'Constants';

const Wishlist = () => {

  
  const usePrevious = (value) => {
    const ref = useRef();
    useEffect(() => {
      ref.current = value;
    });
    return ref.current;
  };

  const [filteredTrips, setFilteredTrips] = React.useState([]);
  const localStorageData = localStorage.getItem('id');
  const wishlistIDs = localStorageData ? JSON.parse(localStorageData) : [];
  const [showMoreTrips, setShowMoreTrips] = React.useState(false);
  const previousWishlistIDs = usePrevious(wishlistIDs);

  const fetchTripDetails = async () => {
    try {
      if(wishlistIDs){
        const response = await axios.post(APIs.WISHLIST_ITEMS, { id: wishlistIDs });
        setFilteredTrips(response.data);
      }
     
    } catch (error) {
      console.error('Error fetching trip details:', error);
    }
  };
  useEffect(() => {
    // Check if the wishlistIDs have changed
    if (!_.isEqual(wishlistIDs, previousWishlistIDs)) {
      if (wishlistIDs.length > 0) {
        fetchTripDetails(); // Fetch details for the wishlistIDs from the backend
      } else {
        setFilteredTrips([]); // If no wishlistIDs, clear the filtered trips
      }
    }
  }, [wishlistIDs, previousWishlistIDs],[]);

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

  const handleMoreTripsClick = () => {
    setShowMoreTrips(true); // Show all trips when the button is clicked
  };


  return (
    <div className='dashboard-container wishlist-page-container'>
      <div className="trips-container">
        <h1 className="title">Wishlist Items</h1>
        <Container className='trips-item-container'>
          <Row className="g-4 justify-content-md-center">
            {filteredTrips.length === 0 ? (
              <span className='noTrip'>No Items found</span>
            ) : (
              showMoreTrips
                ? filteredTrips.map((trip, idx) => (
                  <Col key={idx}>
                    <TripItem
                      trip={{
                        image:
                          trip.type === 'popular'
                            ? popular_trips_images[idx]
                            : near_by_trips_images[idx],
                        ...trip,
                      }} 
                      
                    />
                  </Col>
                ))
                : filteredTrips.slice(0, 3).map((trip, idx) => (
                  <Col key={idx}>
                    <TripItem
                      trip={{
                        image:
                          trip.type === 'popular'
                            ? popular_trips_images[idx]
                            : near_by_trips_images[idx],
                        ...trip,
                      }}
                    />
                  </Col>
                ))
            )}
          </Row>
        </Container>
        {!showMoreTrips && filteredTrips.length > 3 && (
          <div className='button-container'>
            <button
              className="button button-primary button-200 button-sm-100p"
              onClick={handleMoreTripsClick}
            >
              More Trips
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;