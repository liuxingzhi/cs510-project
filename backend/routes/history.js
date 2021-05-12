const express = require('express');
const router = express.Router();
const {SearchHistoryRecord} = require('../models/schema')

router.get('/', async function (req, res) {
    let SearchHistoryRecord = await SearchHistoryRecord.find({})
    res.send(SearchHistoryRecord)
})

router.post('/', async function (req, res) {
    try {
        let username = req.body.username
        let search_query = req.body.search_query
        if (username == null || search_query == null) {
            res.sendStatus(400)
            return
        }
        let dateNow = new Date()
        let historyRecord = new SearchHistoryRecord({
            username: username,
            search_query: search_query,
            search_time: dateNow
        })
        await historyRecord.save()
        res.sendStatus(204)
        console.log(`a new history is saved`)
    } catch (error) {
        res.sendStatus(500)
        console.error(error)
    }
})


router.get('/:username', async function (req, res) {
    let username = req.params.username
    let historyRecord = await SearchHistoryRecord.find({username: username})
    res.send(historyRecord)
})

router.delete('/delete/all', async function (req, res) {
    try {
        await SearchHistoryRecord.deleteMany({})
        res.sendStatus(204)
        console.log(`all users deleted`)
    } catch (error) {
        res.sendStatus(500)
        return console.error(error)
    }
})

module.exports = router;
