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
    'id': '1',
    'type': 'Telephone call (out)',
    "datetime": "2021-02-16T12:30:00",
    'detailed-notes': 'Example detailed notes.',
    'analysis': 'Example analysis text.',
    'actions': 'Example actions.',
    "family-members": []
  }
  ]
}
