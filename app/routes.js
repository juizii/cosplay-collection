module.exports = function (app, passport, db) {


  const MongoClient = require('mongodb').MongoClient;
const uri = 'mongodb+srv://juizii:demodemo@demo.3jj3fwd.mongodb.net/?retryWrites=true&w=majority';

MongoClient.connect(uri, { useNewUrlParser: true }, (err, client) => {
  if (err) {
    console.log('Failed to connect to database:', err);
    return;
  }
  
  const db = client.db('demo');
  // Use the `db` object here
});
  // normal routes ===============================================================



  // show the home page (will also have our login links)
  app.get("/", function (req, res) {
    res.render("index.ejs");
  });

  // PROFILE SECTION =========================
  app.get('/profile', isLoggedIn, (req, res) => {
    res.render('profile.ejs', {
      user: req.user // get the user out of session and pass to template
    });
  });

  // LOGOUT ==============================
  app.get("/logout", function (req, res) {
    req.logout(() => {
      console.log("User has logged out!");
    });
    res.redirect("/");
  });

  // message board routes ===============================================================

app.post("/speakers", (req, res) => {
  const newSpeaker = req.body;
  db.collection("demo").insertOne(newSpeaker, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send("Error saving speaker to database");
      return;
    }
    console.log("saved to database");
    res.redirect("/profile");
  });
});

// // Get all speakers
// app.get('/speakers', (req, res) => {
//   db.collection('demo').find().toArray((err, result) => {
//     if (err) throw err;
//     res.json(result);
//   });
// });

// // Get a single speaker by ID
// app.get('/speakers/:id', (req, res) => {
//   const speakerId = req.params.id;
//   db.collection('demo').findOne({ _id: ObjectId(speakerId) }, (err, result) => {
//     if (err) throw err;
//     res.json(result);
//   });
// });

// // Add a new speaker
// app.post('/speakers', (req, res) => {
//   const newSpeaker = req.body;
//   db.collection('demo').insertOne(newSpeaker, (err, result) => {
//     if (err) throw err;
//     res.status(201).json(result.ops[0]);
//   });
// });

// // Update an existing speaker
// app.put('/speakers/:id', (req, res) => {
//   const speakerId = req.params.id;
//   const updatedSpeaker = req.body;
//   db.collection('demo').updateOne({ _id: ObjectId(speakerId) }, { $set: updatedSpeaker }, (err, result) => {
//     if (err) throw err;
//     res.json(updatedSpeaker);
//   });
// });

// // Delete a speaker
// app.delete('/speakers/:id', (req, res) => {
//   const speakerId = req.params.id;
//   db.collection('demo').deleteOne({ _id: ObjectId(speakerId) }, (err, result) => {
//     if (err) throw err;
//     res.sendStatus(204);
//   });
// });

  // app.put('/speakers/:id', (req, res) => {
  //   const speakerId = req.params.id;
  //   const updatedSpeakerData = req.body;
  //   // ...
  //   // Update speaker data in the database
  //   // ...
  //   res.send('Speaker updated successfully');
  // });


  // app.post('/api/speakers', express.json(), (req, res) => {
  //   const newSpeaker = req.body;
  //   const speakersCollection = client.db('test').collection('characters');
  //   speakersCollection.insertOne(newSpeaker, (err, result) => {
  //     if (err) {
  //       console.log(err);
  //       res.sendStatus(500);
  //     } else {
  //       console.log('New speaker added to database:', newSpeaker);
  //       res.sendStatus(200);
  //     }
  //   });
  // });
  // app.post("/messages", (req, res) => {
  //   db.collection("messages").save(
  //     { name: req.body.name, msg: req.body.msg, thumbUp: 0, thumbDown: 0 },
  //     (err, result) => {
  //       if (err) return console.log(err);
  //       console.log("saved to database");
  //       res.redirect("/profile");
  //     }
  //   );
  // });

  // app.put("/messages", (req, res) => {
  //   db.collection("messages").findOneAndUpdate(
  //     { name: req.body.name, msg: req.body.msg },
  //     {
  //       $set: {
  //         thumbUp: req.body.thumbUp + 1,
  //       },
  //     },
  //     {
  //       sort: { _id: -1 },
  //       upsert: true,
  //     },
  //     (err, result) => {
  //       if (err) return res.send(err);
  //       res.send(result);
  //     }
  //   );
  // });

  // app.put("/messages/thumbDown", (req, res) => {
  //   db.collection("messages").findOneAndUpdate(
  //     { name: req.body.name, msg: req.body.msg },
  //     {
  //       $set: {
  //         thumbUp: req.body.thumbUp - 1,
  //       },
  //     },
  //     {
  //       sort: { _id: -1 },
  //       upsert: true,
  //     },
  //     (err, result) => {
  //       if (err) return res.send(err);
  //       res.send(result);
  //     }
  //   );
  // });

  // app.delete("/messages", (req, res) => {
  //   db.collection("messages").findOneAndDelete(
  //     { name: req.body.name, msg: req.body.msg },
  //     (err, result) => {
  //       if (err) return res.send(500, err);
  //       res.send("Message deleted!");
  //     }
  //   );
  // });

  // =============================================================================
  // AUTHENTICATE (FIRST LOGIN) ==================================================
  // =============================================================================

  // locally --------------------------------
  // LOGIN ===============================
  // show the login form
  app.get("/login", function (req, res) {
    res.render("login.ejs", { message: req.flash("loginMessage") });
  });

  // process the login form
  app.post(
    "/login",
    passport.authenticate("local-login", {
      successRedirect: "/profile", // redirect to the secure profile section
      failureRedirect: "/login", // redirect back to the signup page if there is an error
      failureFlash: true, // allow flash messages
    })
  );

  // SIGNUP =================================
  // show the signup form
  app.get("/signup", function (req, res) {
    res.render("signup.ejs", { message: req.flash("signupMessage") });
  });

  // process the signup form
  app.post('/signup', passport.authenticate('local-signup', {
    successRedirect : '/profile', // redirect to the secure profile section
    failureRedirect : '/signup', // redirect back to the signup page if there is an error
    failureFlash : true // allow flash messages
}), function(req, res) {
    console.log("Request headers:", req.getHeaders());
    console.log("Request body:", req.body);
});

  // =============================================================================
  // UNLINK ACCOUNTS =============================================================
  // =============================================================================
  // used to unlink accounts. for social accounts, just remove the token
  // for local account, remove email and password
  // user account will stay active in case they want to reconnect in the future

  // local -----------------------------------
  app.get("/unlink/local", isLoggedIn, function (req, res) {
    var user = req.user;
    user.local.email = undefined;
    user.local.password = undefined;
    user.save(function (err) {
      res.redirect("/profile");
    });
  });
};

// route middleware to ensure user is logged in
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next();

  res.redirect("/");
}
