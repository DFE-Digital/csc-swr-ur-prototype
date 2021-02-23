const express = require('express')
const router = express.Router()
const crypto = require('crypto')
const moment = require('moment')

// Add your routes here - above the module.exports line


router.all('*', function (req, res, next) {
	// this is to set the service name on all page in this version
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

router.get('/event', (req, res, next) => {
	let id = req.session.data['id']

	// find the event with the matching id from the events object in our session data
	let event = req.session.data['events'].find(event => event.id === id)

	// render the page and include the event object
	res.render(`${req.version}/event`, {event})
})

router.post('/create-event', (req, res, next) => {
	// generate a long random id and declare the variable
	let id = crypto.randomBytes(20).toString('hex');
	req.session.data['id'] = id

	// define the object
	let event = {
		'id': id
	}

	// push the object into the events array in our session data
	req.session.data['events'].push(event)

	res.redirect('event-date')
})

// use this function to update the events object
function updateEvent(id, property, value, req, res) {
	// find the event with the matching id from the events object in our session data
	// from https://stackoverflow.com/questions/7364150/find-object-by-id-in-an-array-of-javascript-objects
	let obj = req.session.data['events'].find(event => event.id === id)
	
	// set the property value to the one that we pass in to this function
	obj[property] = value

	// log the changes to console
	console.log(req.session.data['events'])
}

router.post('/event-type', (req, res, next) => {
	let id = req.session.data['id']
	let type = req.session.data['event-type']

	updateEvent(id, 'type', type, req, res)

	res.redirect('event-date')
})

router.post('/event-date', (req, res, next) => {
	let id = req.session.data['id']

	// make sure we're using the same date format
	let format = "YYYY-MM-DD"

	if(req.session.data['event-date-type'] == 'today'){
		// if the user selected 'today' then set the date variable as today's date
		let date = moment().format(format)
		
		// then update the object		
		updateEvent(id, 'datetime', date, req, res)
	} else {
		// check the user entered values and set the datestring accordingly
		let dateString
		
		if(req.session.data['other-date-year'] && req.session.data['other-date-month'] && req.session.data['other-date-day']){
			dateString = req.session.data['other-date-year'] + "-" + req.session.data['other-date-month'] + "-" + req.session.data['other-date-day']
		} else {
			dateString = moment().format(format)
		}

		// set the date variable and format the date
		let date = moment(dateString, "YYYY-MM-DD").format(format)

		console.log(date)

		// then update the object
		updateEvent(id, 'datetime', date, req, res)
	}

	res.redirect('other-family-present')
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
	let datetime

	if(req.session.data['event-time-hours'] == ''){
		datetime = date
	} else {
		datetime = date + "T" + time	
	}

	// update the events array
	updateEvent(id, 'datetime', datetime, req, res)

	res.redirect('other-family-present')
})

router.post('/other-family-present', (req, res, next) => {
	if(req.session.data['other-family-present'] == 'yes'){
		res.redirect('add-family-member')
	} else {
		res.redirect('notes')
	}
})

router.post('/notes', (req, res, next) => {
	let id = req.session.data['id']
	let detailedNotes = req.session.data['detailed-notes']
	let eventType = req.session.data['event-type']

	updateEvent(id, 'type', eventType, req, res)
	updateEvent(id, 'detailed-notes', detailedNotes, req, res)

	res.redirect('attachments')
})

router.post('/add-family-member', (req, res, next) => {
	res.redirect('family-members')
})

router.post('/family-members', (req, res, next) => {
	if(req.session.data['add-more-family'] == 'no'){
		res.redirect('add-family-member')
	} else {
		let id = req.session.data['id']
		let familyMembers = req.session.data['family-members']

		updateEvent(id, 'family', familyMembers, req, res)

		res.redirect('notes')
	}
})

router.post('/detailed-notes', (req, res, next) => {
	let id = req.session.data['id']
	let detailedNotes = req.session.data['detailed-notes']

	updateEvent(id, 'detailed-notes', detailedNotes, req, res)

	res.redirect('analysis-of-information')
})

router.post('/analysis-of-information', (req, res, next) => {
	let id = req.session.data['id']
	let analysis = req.session.data['analysis']

	updateEvent(id, 'analysis', analysis, req, res)

	res.redirect('action')
})

router.post('/action', (req, res, next) => {
	let id = req.session.data['id']
	let actions = req.session.data['actions']

	updateEvent(id, 'actions', actions, req, res)

	res.redirect('attachments')
})

router.post('/attachments', (req, res, next) => {
	if(req.session.data['attach-files'] == 'yes'){
		res.redirect('new-media-file')
	} else {
		let id = req.session.data['id']
		updateEvent(id, 'attachments', '', req, res)
		res.redirect('check-your-answers')
	}
})

router.post('/new-media-file', (req, res, next) => {
	let id = req.session.data['id']
	let attachments = ['IMG2081.jpg', 'IMG2092.jpg']

	updateEvent(id, 'attachments', attachments, req, res)

	delete req.session.data['attach-files']

	res.redirect('file-upload-complete')
})

// check your answers
router.get('/check-your-answers', (req, res, next) => {
	let id = req.session.data['id']

	// find the event with the matching id from the events object in our session data
	let event = req.session.data['events'].find(event => event.id === id)

	// render the page and include the event object
	res.render(`${req.version}/check-your-answers`, {event})
})

router.post('/check-your-answers', (req, res, next) => {
	// when we confirm the answers we need to sort the events by date
	// from https://stackoverflow.com/questions/10123953/how-to-sort-an-object-array-by-date-property
	req.session.data['events'].sort(function(a,b){
		return new Date(b.datetime) - new Date(a.datetime);
	});

	res.redirect('confirmation-page')
})

module.exports = router