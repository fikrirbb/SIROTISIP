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

var todaysDate = new Date();

function convertDate(date) {
  var yyyy = date.getFullYear().toString();
  var mm = (date.getMonth()+1).toString();
  var dd  = date.getDate().toString();

  var mmChars = mm.split('');
  var ddChars = dd.split('');

  return yyyy + '-' + (mmChars[1]?mm:"0"+mmChars[0]) + '-' + (ddChars[1]?dd:"0"+ddChars[0]);
}

function convertMonth(date) {
  var yyyy = date.getFullYear().toString();
  var mm = (date.getMonth()+1).toString();
  var dd  = date.getDate().toString();

  var mmChars = mm.split('');
  var ddChars = dd.split('');

  return yyyy + '-' + (mmChars[1]?mm:"0"+mmChars[0]);
}

//cek masuk nggak
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    email = user.email;
    }
});

////////////////PAGE HOME ////////////////////////////////
$('#date-format').bootstrapMaterialDatePicker({ format : 'dddd DD MMMM YYYY - HH:mm' });
var ctnbtnTambah = document.getElementById('ctnbtnTambah');
var ktnJudul   = document.getElementById('ktnJudul');
var ktnDet    = document.getElementById('ktnDet');
var ktnID   = document.getElementById('ktnID');

ctnbtnTambah.addEventListener('click', (e) => {
//  e.preventDefault();

  if (!ktnJudul.value || !ktnDet.value) return null

  db.ref('todo/').push().set({
    ktnJudul: ktnJudul.value,
    ktnDet: ktnDet.value
  });

  ktnJudul.value = '';
  ktnDet.value  = '';
  ktnID.value = '';
});

var kontenToDo = document.getElementById('kontenToDo');
var ktnRef = db.ref('/todo');

ktnRef.orderByChild('timeStamp').on('child_added', (data) => {
  var div = document.createElement('div')
  div.id = data.key;
  div.innerHTML = ktnUlang(data.val())
  kontenToDo.appendChild(div);
  document.getElementById(div.id).className = "alert alert-info";
});

 ktnRef.orderByChild('timeStamp').on('child_changed', (data) => {
  var ktnNode = document.getElementById(data.key);
  ktnNode.innerHTML = ktnUlang(data.val());
});

ktnRef.on('child_removed', (data) => {
  var ktnNode = document.getElementById(data.key);
  ktnNode.parentNode.removeChild(ktnNode);
});


kontenToDo.addEventListener('click', (e) => {
  var ktnNode = e.target.parentNode

  // // UPDATE REVEIW
  // if (e.target.classList.contains('edit')) {
  //   $('#exampleModal').modal('show');
  //   barangNama.value = brgNode.querySelector('.barangNama').innerText;
  //   barangJenis.value  = brgNode.querySelector('.barangJenis').innerText;
  //   barangHarga.value  = brgNode.querySelector('.barangHarga').innerText;
  //   hiddenID.value = brgNode.id;
  // }

  // DELETE REVEIW
  if (e.target.classList.contains('delete')) {
    var id = ktnNode.id;
    db.ref('todo/' + id).remove();
  }
});

function ktnUlang({ktnJudul, ktnDet}) {
  return `
  <i class="fa fa-exclamation-circle"></i> ${ktnJudul} </br> ${ktnDet}

      <button type="button" class="delete close" aria-hidden="true">×</button>
  `
};
