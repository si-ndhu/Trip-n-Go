// Author: Rahul Saliya

// const HOST_URL = "http://localhost:3000";
const HOST_URL = "https://web-project-backend-erns.onrender.com";

const APIs = {
  POPULAR_TRIPS: `${HOST_URL}/dashboard/popular-trips`,
  TRIPS_NEAR_YOU: `${HOST_URL}/dashboard/trips-near-you`,
  ALL_TRIPS: `${HOST_URL}/moretrips/allPackages`,
  PACKAGE_DETAILS: `${HOST_URL}/package`,
  TRIPS_BY_LOCATION: `${HOST_URL}/moretrips/filterByLocation`,
  TRIPS_BY_PRICE: `${HOST_URL}/moretrips/filterByPrice`,
  SOCKET_URL: `${HOST_URL}`,
  NOTIFICATIONS: `${HOST_URL}/notifications`,
  CONTACT_US: `${HOST_URL}/contact-us`,
  PAYMENT: `${HOST_URL}/payment`,
  LOGIN: `${HOST_URL}/login`,
  SIGNUP: `${HOST_URL}/signup`,
  FORGOT_PASSWORD: `${HOST_URL}/validate-email`,
  RESET_PASSWORD: `${HOST_URL}/reset-pass`,
  ADMIN_LOGIN: `${HOST_URL}/adminlogin`,
  WISHLIST_ITEMS: `${HOST_URL}/wishlist/packages`,
  PROFILE: `${HOST_URL}/profile`,
};

export default APIs;
export { HOST_URL };
