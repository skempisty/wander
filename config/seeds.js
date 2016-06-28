var mongoose = require('./database');

var User = require('../models/user');
var Trip = require('../models/trip');


// USER SEED
var users = [
  { // 0
    handle: "DunkLord",
    name:   "Bob Neverdunk",
    email: 'bob.neverdunk@gmail.com',
    providerId: 2435234611613,
    created: Date.now()
  },
  { // 1
    handle: "MoneyMarge",
    name:   "Margaret Kalanchoe",
    email: 'margaret.kalanchoe@gmail.com',
    providerId: 232662345144,
    created: Date.now()
  }
];

User.remove({}, function(err) {
  if (err) console.log(err);
  Trip.remove({}, function(err) {
    if (err) console.log(err);
    User.create(users, function(err, users) {
      if (err) {
        console.log(err);
      } else {
        console.log("Database seeded with " + users.length  + " users.");

        Trip.create([
          {
            title: 'Thailand Trip',
            creator: users[0]._id
          },
          {
            title: 'Romp through Rome',
            creator: users[0]._id
          },
          {
            title: 'Woodlands Adventure',
            creator: users[0]._id
          },
          {
            title: 'Taiwan Travels',
            creator: users[1]._id
          },
          {
            title: 'Europe Disaster',
            creator: users[1]._id
          }
        ]), function(err, trips) {
          if (err) {
            console.log(err);
          } else {
            console.log(trips);
            console.log('Database seeded with ' + trips.length + ' trips.');
            mongoose.connection.close(function(err) {
              if (err) console.log(err);
              process.exit(0);
            });
          }
        };
      }
    });
  });
});
