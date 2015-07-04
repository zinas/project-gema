# thegrid

a [Sails](http://sailsjs.org) application


### installation instructions
- Have node, npm, mongo, grunt installed
- clone the repo
- npm install
- sails lift

Some dependencies might be missing, add them manually

If the character cannot move, change the sails -> waterline -> async dependency to 1.0.0

To initialize the database (create a few monsters, add the professions etc.) simply navigate to:
localhost:1337/generate/all