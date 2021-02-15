/*

Provide default values for user session data. These are automatically added
via the `autoStoreData` middleware. Values will only be added to the
session if a value doesn't already exist. This may be useful for testing
journeys where users are returning or logging in to an existing application.

============================================================================

Example usage:

"full-name": "Sarah Philips",

"options-chosen": [ "foo", "bar" ]

============================================================================

*/

module.exports = {

  // Insert values here
  "events":
  [
  {
  	"id": "1",
  	"type": "Test type",
  	"datetime": "2021-02-15T00:00:00",
  	"analysis": "Test analysis",
  	"actions": "Test actions",
  	"notes": "Test notes",
  	"family-members": [],
  	"files": []
  }
  ]
}
