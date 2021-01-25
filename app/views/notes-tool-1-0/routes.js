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

router.post('/create-written-note', (req, res, next) => {
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