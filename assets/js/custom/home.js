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
var tglnow = convertDate(todaysDate)
var cardtransaksi = $('#cardtransaksi');
var ctransRef = db.ref('/transaksi/').orderByChild("transaksitgl").equalTo(tglnow);

ctransRef.on("value", function(snapshot) {
  var test = snapshot.numChildren();
  console.log(convertDate(todaysDate)+"There are "+test+" messages");
  cardtransaksi.text("#"+test);
});

var cardbatas = $('#cardbatas');
var brgRef = db.ref('/barang');
var stokRef = db.ref('/stok').child(tglnow);
var cb=0;

stokRef.on('child_added', (data) => {
  /*var tr = document.createElement('tr')
  tr.id = data.key;
  tr.innerHTML = brgRow(data.val())
  barang.appendChild(tr);*/

  var keyid = data.key;
  var awal, sisa, retur, batas;

    brgRef.child(keyid).once('value', function(dbarang) {
        if (dbarang.val().barangBatas > data.val().stokSisa) {
          cb++;
            console.log("test"+cb);
          cardbatas.text(cb+" Item");
        }
  });


});

var cardpemasukan = $('#cardpemasukan');
var ctransaksi = db.ref('/transaksi').orderByChild("transaksitgl").equalTo(tglnow);
var tt=0;

ctransaksi.once('value', function(snapshot) {
  snapshot.forEach(function(data) {
  tt += parseInt(data.val().transaksitotal);
    //console.log("test"+tt);
  cardpemasukan.text("Rp. "+tt);
  });

});

var cardpengeluaran = $('#cardpengeluaran');
var ctransaksi = db.ref('/pengeluaran').orderByChild("keluartgl").equalTo(tglnow);
var cp=0;

ctransaksi.once('value', function(snapshot) {
  snapshot.forEach(function(data) {
  cp += parseInt(data.val().keluarjumlah);
    console.log("test"+cp);
  cardpengeluaran.text("Rp. "+cp);
  });

});
