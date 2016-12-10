var monk    = require('monk')
var db      = monk('localhost/nihon')
var lessons = db.get('lessons')

var express  = require('express')
var bodyParser = require('body-parser')
var app = express()

var voicetext = require('voicetext');
var voice = new voicetext('2i2sjwtslcizy91h');

app.use(express.static('../client/dist'));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/api/lesson', (req, res) => {
    lessons
        .find({}, '_id name')
        .then(lessons => res.json(lessons))
})

app.get('/api/lesson/:id', (req, res) => {
    lessons
        .findOne({ _id: req.params.id })
        .then(lesson => res.json(lesson))
})

app.delete('/api/lesson/:id', (req, res) => {
    lessons
        .remove({ _id: req.params.id })
        .then(() => res.json({success: true}))
})

app.post('/api/lesson', (req, res) => { 
    lessons
        .insert({ name: req.body.name, entries: [] })
        .then(lesson => res.json(lesson))
}) 

app.put('/api/lesson/:lessonId/entry/:entryId', (req, res) => {
    lessons
        .update(
            { _id: req.params.lessonId, "entries._id": monk.id(req.params.entryId) },
            { $set: { "entries.$": req.body } }
        )
        .then(() => res.json(req.body))
})

app.post('/api/lesson/:lessonId/entry', (req, res) => {
    var entry = Object.assign({}, req.body, { _id: monk.id() })
    lessons
        .update({ _id: req.params.lessonId }, { $push: { 'entries': entry } })
        .then(() => res.json(entry))
})

app.delete('/api/lesson/:lessonId/entry/:entryId', (req, res) => {
    lessons
        .update(
            { _id: req.params.lessonId },
            { $pull: { entries: { _id: monk.id(req.params.entryId) } } }
        )
        .then(() => res.json({success: true}))
})

app.get('/api/voice', (req, res) => {
    voice
        .format(voice.FORMAT.AAC)
        .speed(req.query.speed)
        .speak(decodeURIComponent(req.query.text), (e, buffer) => res.send(buffer))
})

app.listen(7900, () => console.log('Application listening on port 7900.'))
