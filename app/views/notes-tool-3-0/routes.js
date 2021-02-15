const express = require('express')
const router = express.Router()
const crypto = require('crypto')
const moment = require('moment')

// Add your routes here - above the module.exports line

// Use this to set the service name on all page in this version
router.all('*', function (req, res, next) {
	res.locals['serviceName'] = 'Record notes for a social work assessment'

	next()
})

// recirect route to start page
router.get('/', (req, res, next) => {
	res.redirect(`/${req.version}/start`)
})

router.post('/select-case', (req, res, next) => {
	res.redirect('assessment-notes')
})

router.post('/create-event', (req, res, next) => {
	let id = crypto.randomBytes(20).toString('hex');
	req.session.data['id'] = id

	let event = {
		'id': id
	}

	req.session.data['events'].push(event)

	res.redirect('event-type')
})

router.post('/event-type', (req, res, next) => {
	let id = req.session.data['id']
	let type = req.session.data['event-type']

	updateEvent(id, 'type', type, req, res)

	res.redirect('event-date')
})

function updateEvent(id, property, value, req, res) {
	// https://stackoverflow.com/questions/7364150/find-object-by-id-in-an-array-of-javascript-objects
	let obj = req.session.data['events'].find(event => event.id === id)
	
	obj[property] = value

	console.log(req.session.data['events'])
}

router.post('/event-date', (req, res, next) => {
	let id = req.session.data['id']

	let format = "YYYY-MM-DDTHH:mm"

	if(req.session.data['event-date-type'] == 'today'){
		let date = moment().format(format)
		
		updateEvent(id, 'datetime', date, req, res)
	} else {
		let dateString = req.session.data['other-date-year'] + "-" + req.session.data['other-date-month'] + "-" + req.session.data['other-date-day']
		let date = moment(dateString, "YYYY-MM-DD").format(format)

		updateEvent(id, 'datetime', date, req, res)
	}

	res.redirect('event-time')
})

router.post('/event-time', (req, res, next) => {
	let id = req.session.data['id']

	// find the event object we want to modify
	let event = req.session.data['events'].find(event => event.id === id)

	// split the date from the time
	let date = event['datetime'].split("T")[0]

	// convert the user time to a string
	let time = req.session.data['event-time-hours'] + ":" + req.session.data['event-time-minutes'] + ":00"

	// create the new datetime value by combining the date and time variables
	let datetime = date + "T" + time

	// update the events array
	updateEvent(id, 'datetime', datetime, req, res)

	res.redirect('other-family-present')
})

router.post('/other-family-present', (req, res, next) => {
	if(req.session.data['other-family-present'] == 'yes'){
		res.redirect('add-family-member')
	} else {
		res.redirect('detailed-notes')
	}
})

router.post('/add-family-member', (req, res, next) => {
	res.redirect('family-members')
})

router.post('/family-members', (req, res, next) => {
	if(req.session.data['add-more-family'] == 'yes'){
		res.redirect('add-family-member')
	} else {
		res.redirect('detailed-notes')
	}
})

router.post('/attachments', (req, res, next) => {
	if(req.session.data['attach-files'] == 'yes'){
		res.redirect('new-media-file')
	} else {
		res.redirect('check-your-answers')
	}
})

router.post('/new-media-file', (req, res, next) => {
	delete req.session.data['attach-files']

	res.redirect('file-upload-complete')
})

router.post('/mental-health-concerns', (req, res, next) => {
	if(req.session.data['mental-health-concerns'] == 'yes'){
		res.redirect('mental-health-concerns-detail')
	} else {
		res.redirect('wellbeing')
	}
})

router.post('/medication', (req, res, next) => {
	if(req.session.data['medication'] == 'yes'){
		res.redirect('medication-detail')
	} else {
		res.redirect('check-your-answers')
	}
})

router.post('/contact-method', (req, res, next) => {
	if(req.session.data['contact-method'] == 'visit-not-scheduled'){
		res.redirect('visit-time-entry')
	} else {
		res.redirect('contact-reason')
	}
})

module.exports = router