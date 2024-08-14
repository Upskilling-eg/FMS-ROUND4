const BASE_URL = "https://upskilling-egypt.com:3006/api/v1";
export const BASE_IMG_URL = "https://upskilling-egypt.com:3006"

// USERS URLs
const BASE_USERS = `${BASE_URL}/Users`;

export const USERS_URLS = {
  login: `${BASE_USERS}/Login`,
  register: `${BASE_USERS}/Register`,
  delete: (id) => `${BASE_USERS}/${id}`,
  resetRequest: `${BASE_USERS}/Reset/Request`,
  reset: `${BASE_USERS}/Reset`,
  verify : `${BASE_USERS}/verify`,
};

//CATEGORIES URLs
const BASE_CATEGORY = `${BASE_URL}/Category`


export const CATEGORIES_URLS = {
  getList: `${BASE_CATEGORY}`,
  delete: (id) => `${BASE_CATEGORY}/${id}`,
  create: `${BASE_CATEGORY}`,
};


//RECIPES URLs
const BASE_RECIPE = `${BASE_URL}/Recipe`

export const RECIPES_URLS = {
  getList: `${BASE_RECIPE}`,
  delete: (id) => `${BASE_RECIPE}/${id}`,
  create: `${BASE_RECIPE}`,

};

export const GETALLTAGS = `${BASE_URL}/tag`