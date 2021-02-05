const express = require('express')
const router = express.Router()

// Add your routes here - above the module.exports line

router.use(/\/notes-tool-([0-9]+)-([0-9]+)/, (req, res, next) => {
	req.version = req.originalUrl.split('/')[1]

	require(`./views/notes-tool-${req.params[0]}-${req.params[1]}/routes`)(req, res, next);
})

router.use(/\/case-note-([0-9]+)-([0-9]+)/, (req, res, next) => {
	req.version = req.originalUrl.split('/')[1]

	require(`./views/case-note-${req.params[0]}-${req.params[1]}/routes`)(req, res, next);
})

router.use(/\/case-summary-tool-([0-9]+)-([0-9]+)/, (req, res, next) => {
	req.version = req.originalUrl.split('/')[1]

	require(`./views/case-summary-tool-${req.params[0]}-${req.params[1]}/routes`)(req, res, next);
})

router.use(/\/s47-outcome-([0-9]+)-([0-9]+)/, (req, res, next) => {
	req.version = req.originalUrl.split('/')[1]

	require(`./views/s47-outcome-${req.params[0]}-${req.params[1]}/routes`)(req, res, next);
})

router.use(/\/record-visit-([0-9]+)-([0-9]+)/, (req, res, next) => {
	req.version = req.originalUrl.split('/')[1]

	require(`./views/record-visit-${req.params[0]}-${req.params[1]}/routes`)(req, res, next);
})

module.exports = router
