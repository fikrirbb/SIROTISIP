var config = {
    apiKey: "AIzaSyD0NF7XE1cUM9ahOm8EEYNAPAxAsfvG_H8",
    authDomain: "belajar-a6c69.firebaseapp.com",
    databaseURL: "https://belajar-a6c69.firebaseio.com",
    projectId: "belajar-a6c69",
    storageBucket: "belajar-a6c69.appspot.com",
    messagingSenderId: "983334527033"
  };
  firebase.initializeApp(config);
var db = firebase.database();

////////////////// PAGE LOGIN ///////////////////////////
var txtemail = document.getElementById('txtEmail');
var txtpassword = document.getElementById('txtPassword');
var btnmasuk = document.getElementById('btnMasuk');

btnmasuk.addEventListener('click', e => {
  var email = txtemail.value;
  var pass = txtpassword.value;
  var auth = firebase.auth();

  //proses Masuk
  var kunci = auth.signInWithEmailAndPassword(email, pass);
  kunci.catch(e => console.log(e.message))
});


//cek masuk nggak
firebase.auth().onAuthStateChanged (firebaseUser => {
  if (firebaseUser) {
    console.log(firebaseUser)
    window.location = '../index.php?page=home';
  }else {
    //window.location = 'pages/login.html';
  }
})
