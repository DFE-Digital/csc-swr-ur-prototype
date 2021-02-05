const express = require('express')
const router = express.Router()
const crypto = require('crypto')

// Add your routes here - above the module.exports line

// Use this to set the service name on all page in this version
router.all('*', function (req, res, next) {
	res.locals['serviceName'] = 'Record a social work assessment visit'

	next()
})

// recirect route to start page
router.get('/', (req, res, next) => {
	res.redirect(`/${req.version}/start`)
})

router.post('/observation-type', (req, res, next) => {
	let type = req.session.data['observation-type']

	if (type == 'written-note'){
		res.redirect('create-written-note')
	} else if (type == 'photo' || type == 'video'){
		res.redirect('new-media-file')
	} else {
		res.redirect('not-built-yet')
	}
})

// create a written note
router.get('/create-written-note', (req, res, next) => {
	let id = crypto.randomBytes(20).toString('hex');
	let url = 'new-written-note?id=' + id

	res.redirect(url)
})

router.post('/new-written-note', (req, res, next) => {
	let id = req.session.data['id']

	if(! req.session.data['written-notes']){
		req.session.data['written-notes'] = new Array()
	}

	let note = {
		id: id,
		text: req.session.data['note-content'],
		timestamp: Date.now()
	}

	req.session.data['written-notes'].push(note)

	delete req.session.data['note-content']
	delete req.session.data['id']

	res.redirect('assessment-notes')
})

function getNote(req, res, id) {
	let note = req.session.data['written-notes'].filter(function (el) {
		return el.id === id
	});

	return note
}

router.get('/written-note', (req, res, next) => {
	let note = getNote(req, res, req.session.data['id'])

	res.render(`${req.version}/written-note`, {note})
})

router.get('/edit-written-note', (req, res, next) => {
	let note = getNote(req, res, req.session.data['id'])

	res.render(`${req.version}/edit-written-note`, {note})
})

router.post('/edit-written-note', (req, res, next) => {
	let id = req.session.data['id']

	// find the position of the matching id
	let pos = req.session.data['written-notes'].findIndex(note => note.id == id)

	// update the values
	req.session.data['written-notes'][pos].text = req.session.data['note-content']
	req.session.data['written-notes'][pos].timestamp = Date.now()

	delete req.session.data['note-content']
	delete req.session.data['id']

	res.redirect('assessment-notes')
})

router.post('/cancel-written-note', (req, res, next) => {
	let id = req.session.data['id']

	if(! req.session.data['written-notes']){
		req.session.data['written-notes'] = new Array()
	}

	let note = {
		id: id,
		text: req.session.data['note-content'],
		timestamp: Date.now()
	}

	req.session.data['written-notes'].push(note)

	delete req.session.data['note-content']
	delete req.session.data['id']

	res.redirect('assessment-notes')
})

module.exports = router