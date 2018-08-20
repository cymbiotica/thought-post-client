let apiUrl
const apiUrls = {
  production: '',
  development: 'http://localhost:3001/api/v1/ideas'
}

if (window.location.hostname === 'localhost') {
  apiUrl = apiUrls.development
} else {
  apiUrl = apiUrls.production
}

module.exports = {
  apiUrl
}