var _ = require('lodash');

var localEnvVars = {
  TITLE:      'wander',
  SAFE_TITLE: 'wander'
};

// Merge all environmental variables into one object.
module.exports = _.extend(process.env, localEnvVars);
