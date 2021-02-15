const express = require('express')
const router = express.Router()
const crypto = require('crypto')

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

router.post('/event-time', (req, res, next) => {
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