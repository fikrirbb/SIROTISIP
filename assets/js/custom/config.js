
// var config = {
//     apiKey: "AIzaSyD0NF7XE1cUM9ahOm8EEYNAPAxAsfvG_H8",
//     authDomain: "belajar-a6c69.firebaseapp.com",
//     databaseURL: "https://belajar-a6c69.firebaseio.com",
//     projectId: "belajar-a6c69",
//     storageBucket: "belajar-a6c69.appspot.com",
//     messagingSenderId: "983334527033"
//   };
//   firebase.initializeApp(config);
// var db = firebase.database();

//cek masuk nggak
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    email = user.email;
    $('#showemail').append(email);
      $('#showemail2').append(email);
    document.getElementById("txtemail").value = email;
    // var user = firebase.auth().currentUser;
    // console.log(user.email);
    // email = user.email;
    // $('#showemail').append(email);
    // document.getElementById("txtemail").value = email;
    /////////////// SETING AKUN ////////////////////////
    var txtpasslama = document.getElementById('txtpasslama');
    var txtpassbaru = document.getElementById('txtpassbaru');

  $(".updatePass").click(function (e) {
    var credential = firebase.auth.EmailAuthProvider.credential(
      user.email,
      txtpasslama.value
    );
    user.reauthenticateWithCredential(credential).then(function() {

      user.updatePassword(txtpassbaru.value).then(function() {
          console.log("suksees");
        }).catch(function(error) {
        console.log("gagal");
        });
    }).catch(function(error) {
      console.error('User signin error', err);
    });
      });
  } else {
    window.location = 'pages/login.html';
  }
});




function logout() {

  firebase.auth().signOut();
  window.location = "pages/login.html";

}



/////////////// PAGE BARANG ///////////////////////////
var btnForm = document.getElementById('btnForm');
var barangNama   = document.getElementById('barangNama');
var barangJenis    = document.getElementById('barangJenis');
var barangHarga    = document.getElementById('barangHarga');
var hiddenID   = document.getElementById('hiddenID');

var table = $('#myTable').DataTable ({
  "columnDefs": [
    { className: "barangNama", "targets": [ 1 ]  },
      { className: "barangJenis", "targets": [ 2 ]  },
      { className: "barangHarga", "targets": [ 3 ]  }
  ],
  "lengthMenu": [5, 10, 20, 50, 100],
  "pageLength": 5
  //'createdRow': function( row, data, dataIndex ) {
      //$(row).attr('id', data.key);
  //}
});

btnForm.addEventListener('click', (e) => {
  //e.preventDefault();

  if (!barangNama.value || !barangJenis.value || !barangHarga.value) return null;

  var id = hiddenID.value || Date.now();

  db.ref('barang/' + id).update({
    barangNama: barangNama.value,
    barangHarga: barangHarga.value,
    barangJenis: barangJenis.value,
  });

  barangNama.value = '';
  barangHarga.value  = '';
  barangJenis.value = '';
  hiddenID.value = '';
  $('#exampleModal').modal('hide');
});

$('#exampleModal').on('hide.bs.modal', function (e) {
  barangNama.value = '';
  barangHarga.value  = '';
  barangJenis.value = '';
  hiddenID.value = '';
})

var barang = document.getElementById('barangtabel');
var brgRef = db.ref('/barang');

brgRef.on('child_added', (data) => {
  /*var tr = document.createElement('tr')
  tr.id = data.key;
  tr.innerHTML = brgRow(data.val())
  barang.appendChild(tr);*/
  var dataSet = [
    data.key,
    data.val().barangNama,
    data.val().barangJenis,
    data.val().barangHarga,
    `<td>
    <button class="edit btn btn-info"><span class="fa fa-pencil"></span></button>
    <button class="delete btn btn-danger "><span class="fa fa-trash"></span></button>
    </td>`];
  table.rows.add([dataSet]).draw().nodes()
    .to$()
    .attr("id", data.key );
});

brgRef.on('child_changed', (data) => {
  var brgNode = document.getElementById(data.key);
  brgNode.innerHTML = brgRow(data.key, data.val());

});

brgRef.on('child_removed', (data) => {
  var brgNode = document.getElementById(data.key);
  brgNode.parentNode.removeChild(brgNode);
});


barang.addEventListener('click', (e) => {
  var brgNode = e.target.parentNode.parentNode

  // UPDATE REVEIW
  if (e.target.classList.contains('edit')) {
    $('#exampleModal').modal('show');
    barangNama.value = brgNode.querySelector('.barangNama').innerText;
    barangJenis.value  = brgNode.querySelector('.barangJenis').innerText;
    barangHarga.value  = brgNode.querySelector('.barangHarga').innerText;
    hiddenID.value = brgNode.id;
  }

  // DELETE REVEIW
  if (e.target.classList.contains('delete')) {
    var id = brgNode.id;
    db.ref('barang/' + id).remove();
  }
});

function brgRow(key, {barangNama, barangHarga, barangJenis}) {
  return `
    <td >${key}</td>
    <td class='barangNama' id='barangNama'>${barangNama}</td>
    <td class='barangJenis'>${barangJenis}</td>
    <td class='barangHarga'>${barangHarga}</td>
    <td>
        <button class="edit btn btn-info"><span class="fa fa-pencil"></span></button>
        <button class="delete btn btn-danger "><span class="fa fa-trash"></span></button>
                </td>
  `
};

/////////////// END PAGE BARANG ///////////////////////////
