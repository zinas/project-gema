var User = {
  // Enforce model schema in the case of schemaless databases
  schema: true,

  attributes: {
    firstname  : { type: 'string' },
    lastname  : { type: 'string' },
    username  : { type: 'string', unique: true },
    email     : { type: 'email',  unique: true },
    passports : { collection: 'Passport', via: 'user' }
  }
};

module.exports = User;
