//epxress server 3000
const express = require('express');

//import ScrapController
const { ScrapController } = require('./Controllers/ScrapController');



const app = express();

app.get('/', (req, res) => {

    const { f_77, f_89, f_80, f_92, f_102 } = req.query;

    let params = {
        'F_77': f_77,
        'F_89': f_89,
        'F_80': f_80,
        'F_92': f_92,
        'F_102': f_102
    }

    // call the start method from ScrapController
    const response = ScrapController.start(params);

    res.send(response);

});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});