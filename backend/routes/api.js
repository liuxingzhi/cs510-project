const express = require('express');
const router = express.Router();

router.get('/', async function (req, res) {
    res.json({ message: "this shall be a protected route " })
})

router.post('/search', async function (req, res) {
    if (req.body == null) {
        res.status(400).send('bad request, body should not be null')
        return
    }

    let keyword = req.body.keyword;
    if (keyword == null) {
        res.status(400).send('required field missing')
        return
    }

    var http = require('http');
    var options = {
        host: 'http://timan102.cs.illinois.edu/explanation//slide/cs-410/0',
        path: '/',
        //since we are listening on a custom port, we need to specify it by hand
        port: '1337',
        //This is what changes the request to a POST request
        method: 'POST'
    };

    const data = JSON.stringify({
        "searchString": "theory",
        "route": "/explanation//slide/cs-410/0"
    });

    const axios = require('axios')

    axios
        .post('http://timan102.cs.illinois.edu//explanation/search_slides', {
            searchString: "theory",
            route: "/explanation//slide/cs-410/0",
        })
        .then(res => {
            console.log(`statusCode: ${res.statusCode}`)
            console.log(res)
        })
        .catch(error => {
            console.error(error)
        })

    //   var response = "";

    //   const timanRequest = http.request(options, res => {
    //       console.log(`statusCode: ${res.statusCode}`);
    //       response = res.statusCode;

    //       res.on('data', d => {
    //         process.stdout.write(d)
    //       })
    //   });

    //   timanRequest.write(data);
    //   timanRequest.end();

    //   callback = function(response) {
    //     var str = ''
    //     response.on('data', function (chunk) {
    //       str += chunk;
    //     });

    //     response.on('end', function () {
    //       console.log(str);
    //       data = str;
    //     });
    //   }

    //   var req = http.request(options, callback);
    //   //This is the data we are posting, it needs to be a string or a buffer
    //   req.write("hello world!");
    //   req.end();

    res.status(200).send(
        JSON.stringify({
            result: "",
        })
    )
});

module.exports = router;