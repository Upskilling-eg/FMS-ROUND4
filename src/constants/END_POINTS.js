const BASE_URL = "https://upskilling-egypt.com:3006/api/v1";

const BASE_USERS = `${BASE_URL}/Users`;

// USERS URLs
export const USERS_URLS = {
  login: `${BASE_USERS}/Login`,
  register: `${BASE_USERS}/Register`,
  resetRequest: `${BASE_USERS}/Reset/Request`,
  delete: (id) => `${BASE_USERS}/${id}`,
};

// RECIPE URLs
// Category URLs
