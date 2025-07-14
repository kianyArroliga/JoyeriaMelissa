const cloudinary = require('cloudinary').v2;
 
cloudinary.config({
    cloud_name: 'dkk7sha9c',
    api_key: '189155888721143',
    api_secret: 'Ga1uW0Dfj0ecZEYkeUFOB-Y2P3c',
})
 
module.exports = cloudinary;