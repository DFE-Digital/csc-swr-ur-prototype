const express = require('express')
const router = express.Router()
const crypto = require('crypto')

// Add your routes here - above the module.exports line

// Use this to set the service name on all page in this version
router.all('*', function (req, res, next) {
	res.locals['serviceName'] = 'Create a social work case summary'

	next()
})

// recirect route to start page
router.get('/', (req, res, next) => {
	res.redirect(`/${req.version}/start`)
})

router.post('/type-of-contact', (req, res, next) => {
	let type = req.session.data['type-of-contact']

	if(type == 'case-note' || type == 'daily-record'){
		res.redirect('contact-date')
	} else {
		res.redirect('not-built-yet')
	}
})

router.post('/contact-time', (req, res, next) => {
	let type = req.session.data['type-of-contact']

	if(type == 'case-note'){
		res.redirect('contact-method')
	} else if(type == 'daily-record'){
		res.redirect('general-information')
	}
})

router.post('/incidents', (req, res, next) => {
	if(req.session.data['incidents'] == 'yes'){
		res.redirect('incidents-detail')
	} else {
		res.redirect('checks-carried-out')
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