const path = require('path');

const getMessages = (req, res) => {

    res.sendFile(path.join(__dirname, '..', 'public', '096-skimountain.jpg'));
}

module.exports =  {getMessages};