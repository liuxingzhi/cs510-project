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

    const axios = require('axios')

    var address = "http://timan102.cs.illinois.edu/explanation//search_slide/";

    axios
    .post('http://timan102.cs.illinois.edu//explanation/search_slides', {
        searchString: keyword,
        route: "/explanation//slide/cs-410/0",
    })
    .then(response => {
        if (response.data.search_course_names[0] == null || response.data.lnos == null || response.data.results[0] == null) {
            res.status(200).send("");
        }
        address += response.data.search_course_names[0] + '/' + response.data.lnos[0] + '/' + response.data.results[0];
        console.log(address);
        // res.json({message: address});
        res.status(200).send(address);
    })
    .catch(error => {
        console.error(error)
        res.status(400).send(error)
    })
});

module.exports = router;