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
  "id": "example-1",
  "events":
  [
  {
    'id': 'example-3',
    'type': 'General check in',
    "datetime": "2021-02-16T12:30:00",
    'detailed-notes': 'Nam convallis eleifend ex, sed varius neque consectetur id. Praesent pellentesque aliquet massa, in fermentum lectus venenatis sed.\r\n\r\nSuspendisse congue lacus imperdiet nulla cursus pulvinar.',
    "family-members": [],
    'attachments': [
      'drawing-1.jpg'
    ],
    'private': 'true'
  },
  {
    'id': 'example-2',
    'type': 'Home visit',
    "datetime": "2021-01-22T15:30:00",
    'detailed-notes': 'Donec viverra orci velit, eget faucibus ligula porta et. Nunc at convallis mi, non ullamcorper elit.\r\n\r\nUt congue augue cursus consequat vestibulum. Duis quis ornare nisi. Aenean a malesuada justo. Phasellus porttitor mollis turpis, in lobortis nunc suscipit nec. Ut vel fringilla orci.\r\n\r\nEtiam sed lacus ut nunc suscipit venenatis sed eget odio. Nulla facilisis nec purus ut pretium.',
    "family-members": [],
    'attachments': [
      'drawing-2.jpg',
      'genogram.jpg'
    ]
  },
  {
    'id': 'example-1',
    'type': 'Referral',
    "datetime": "2021-01-12",
    'detailed-notes': 'Nunc at convallis mi, non ullamcorper elit. Ut congue augue cursus consequat vestibulum.\r\n\r\nDuis quis ornare nisi. Aenean a malesuada justo. Phasellus porttitor mollis turpis, in lobortis nunc suscipit nec. Ut vel fringilla orci. Etiam sed lacus ut nunc suscipit venenatis sed eget odio.\r\n\r\nNulla facilisis nec purus ut pretium.',
    "family-members": []
  }
  ]
}
