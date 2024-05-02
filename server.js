//epxress server 3000
const express = require('express');

//import ScrapController
const { ScrapController } = require('./Controllers/ScrapController');



const app = express();

app.get('/', (req, res) => {

    let params = {
        'F_77': '12345678901',
        'F_89': '123456',
        'F_80': '123456',
        'F_92': '2020',
        'F_102': '123456'
    }

    // call the start method from ScrapController
    const response = ScrapController.start(params);

    res.send(response);

});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});