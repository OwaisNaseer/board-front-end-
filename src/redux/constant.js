// Base URL
export const baseURL = 'https://drselftape-api.testerp.co/api';

// Endpoints
const endPoints = {
  /*********************** Authentication *************************/
  // Login User
  login: `${baseURL}/v1/users/login/`,

  // Register User
  register: `${baseURL}/v1/users/personal-info-registration/`,

  // Forgot Password
  forgotPassword: `${baseURL}/v1/users/forgotpassword/`,

  // Reset Password
  resetPassword: `${baseURL}/v1/users/reset-password/`,
  /*********************** Authentication *************************/

  /************************* Auditions ****************************/
  // Casting Auditions
  castingAuditions: `${baseURL}/v1/auditions/casting-auditions/`,

  // Self Auditions
  selfAudition: `${baseURL}/v1/auditions/self-auditions/`,
  /************************* Auditions ****************************/

  /************************* Bookings ****************************/
  bookings: `${baseURL}/v1/bookings/`,
  bookingDetail: (id) => `${baseURL}/v1/bookings/${id}/`,
  /************************* Bookings ****************************/

  /************************* Notifications ************************/
  myNotifications: `${baseURL}/v1/notifications/my-notifications/`,
  /************************* Notifications ************************/
};

export default endPoints;
