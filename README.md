# Futurama API

Author: [Kate Dameron](https://github.com/Katedam)

```
NOTICE! The host url has changed due to Heroku's restructuring! The new host is:
https://futurama-api.fly.dev
```

[SITE](https://futurama-api.fly.dev)

## Overview

This is an open-source API that provides Futurama quotes with corresponding character names and images. These are publicly sourced and I have no claim to ownership.

# Documentation

All routes are GET requests

'/api/quotes'
-> Returns a list of all quotes

'/api/quotes/:count
-> Returns ':count' of randomly picked quotes

'/api/characters/:character
-> Returns a list of all quotes for the ':character'

'/api/characters/:character/:count
-> Returns random ':count' for the ':character'

## Contributing

I welcome contributions and suggestions for improvement via Pull Requests.

1. Clone and download [GitHub repo](https://github.com/Katedam/futurama-api)

2. Install dependencies:\
   `npm i`

3. Run scripts:\
   `npm run lint`\
   `npm run pretest`\
   `npm run test`\
   `npm run test:watch`\
   `npm run start` (start node server)\
   `npm run start:watch` (start nodemon server)\
   `node seed` (seed database)\
   `npm run drop` (drop MongoDB)\
   `npm run db-load-all` (drop db and load seed data from scratch)

## License

Standard [MIT](/LICENSE.md)
