
module.exports = {
  auth: null,
  init: function (callback) {
    var config = {
      apiKey: "AIzaSyD0NF7XE1cUM9ahOm8EEYNAPAxAsfvG_H8",
      authDomain: "belajar-a6c69.firebaseapp.com",
      databaseURL: "https://belajar-a6c69.firebaseio.com",
      projectId: "belajar-a6c69",
      storageBucket: "belajar-a6c69.appspot.com",
      messagingSenderId: "983334527033"
    };
    Firebase.initializeApp(config);

    this.auth = Firebase.auth();
    this.auth
      .onAuthStateChanged(function(user) {
        if(callback){
          callback();
        }
      })

    return this;
  },

  checkLoggedInUser: function(){
    return this.auth.currentUser
  },

  register: function(data){
    return this.auth
      .createUserWithEmailAndPassword(data.email, data.password)
      .then(this.resultHandler)
      .catch(this.errorHandler);
  },

  logout: function () {
    this.auth
      .signOut()
      .then(function () {
        return true;
      })
      .catch(function (e) {
        return false;
      })
  },
  login: function (type, data) {
    var auth = Firebase.auth();
    var request = null;
    switch(type){
      case 'email': {
        request = auth.signInWithEmailAndPassword(data.email, data.password)
        break;
      }

      case 'facebook': {
        var provider = new Firebase.auth.FacebookAuthProvider();
        provider.addScope('public_profile');
        request = auth.signInWithPopup(provider)
        break;
      }

      case 'twitter': {
        var provider = new Firebase.auth.TwitterAuthProvider();
        request = auth.signInWithPopup(provider)
        break;
      }

      case 'google': {
        var provider = new Firebase.auth.GoogleAuthProvider();
        provider.addScope('https://www.googleapis.com/auth/plus.login'); //Optional
        request = auth.signInWithPopup(provider)
        break;
      }

      case 'github': {
        var provider = new Firebase.auth.GithubAuthProvider();
        provider.addScope('repo'); //Optional
        request = auth.signInWithPopup(provider)
        break;
      }

      case 'anonymous': {
        request = auth.signInAnonymously();
        break;
      }
    }
    if( request !== null ){
      return request
        .then(this.resultHandler)
        .catch(this.errorHandler);
    } else {
      console.log('No Method Found');
      return null;
    }
  },

  resultHandler: function (user) {
    console.log(user)
    return user;
  },

  errorHandler: function (err) {
    console.error(err);
    return false;
  }
}
