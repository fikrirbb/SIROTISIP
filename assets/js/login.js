var config = {
  // Initialize Firebase
  apiKey: "AIzaSyD2iDKD_hPWZ_D3_SlReuL5y66iJdr5IaQ",
  authDomain: "sirotisip.firebaseapp.com",
  databaseURL: "https://sirotisip.firebaseio.com",
  projectId: "sirotisip",
  storageBucket: "",
  messagingSenderId: "789985661044"
  };
  firebase.initializeApp(config);
var db = firebase.database();

////////////////// PAGE LOGIN ///////////////////////////
var txtemail = document.getElementById('txtEmail');
var txtpassword = document.getElementById('txtPassword');
var btnmasuk = document.getElementById('btnMasuk');
var lgeror = document.getElementById('lgeror');

btnmasuk.addEventListener('click', e => {
  var email = txtemail.value;
  var pass = txtpassword.value;
  var auth = firebase.auth();

  //proses Masuk
  var kunci = auth.signInWithEmailAndPassword(email, pass);
  kunci.catch(e =>{
    $('#lgeror').html(e.message);
    //console.log(e.message)
  });
});


//cek masuk nggak
firebase.auth().onAuthStateChanged (firebaseUser => {
  if (firebaseUser) {
    console.log(firebaseUser);
    swal({
            title: "Berhasil Login!",
            text: "Anda akan diarahkan ke halaman utama.",
            type: "success"
        }, function() {
            window.location = "../index.php?page=home";
        });
    //window.location = '../index.php?page=home';
  }else {
    //window.location = 'pages/login.html';
  }
})
