
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
        swal({
                title: "Berhasil!",
                text: "Anda berhasil mengupdate password.",
                type: "success"
            }, function() {
              $('txtpasslama').val(null);
              $('txtpassbaru').val(null);
                //window.location = "../index.php?page=home";
            });
        }).catch(function(error) {
          gagalupdate(error);
        });
    }).catch(function(error) {
      gagalupdate(error);
    });
      });
  } else {
    window.location = 'pages/login.html';
  }
});

function gagalupdate(error) {
  swal({
          title: "Gagal!",
          text: error,
          type: "warning"
      }, function() {
        $('txtpasslama').val(null);
        $('txtpassbaru').val(null);
          //window.location = "../index.php?page=home";
      });
}



function logout() {

  firebase.auth().signOut();
  window.location = "pages/login.html";

}



/////////////// PAGE BARANG ///////////////////////////
var btnForm = document.getElementById('btnForm');
var barangNama   = document.getElementById('barangNama');
var barangJenis    = document.getElementById('barangJenis');
var barangHarga    = document.getElementById('barangHarga');
var barangBatas    = document.getElementById('barangBatas');
var hiddenID   = document.getElementById('hiddenID');

var table = $('#myTable').DataTable ({
  "columnDefs": [
    { className: "barangNama", "targets": [ 1 ]  },
      { className: "barangJenis", "targets": [ 2 ]  },
      { className: "barangHarga", "targets": [ 3 ]  },
      { className: "barangBatas", "targets": [ 4 ]  }
  ],
  "lengthMenu": [5, 10, 20, 50, 100],
  "pageLength": 5,
  "columns": [
    null,
    {
      "defaultContent": "0"
    },
    {
      "defaultContent": "0"
    },
    {
      "defaultContent": "0"
    },
    {
      "defaultContent": "0"
    },
    null

  ],
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
    barangBatas: barangBatas.value,
  });

  barangNama.value = '';
  barangHarga.value  = '';
  barangJenis.value = '';
  hiddenID.value = '';
  $('#exampleModal').modal('hide');
});

function resetbrg() {
  barangNama.value = '';
  barangHarga.value  = '';
  barangJenis.value = '';
  barangBatas.value = '';
  hiddenID.value = '';
  $('#exampleModal').modal('hide');
}

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
    data.val().barangBatas,
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
    barangBatas.value  = brgNode.querySelector('.barangBatas').innerText;
    hiddenID.value = brgNode.id;
  }

  // DELETE REVEIW
  if (e.target.classList.contains('delete')) {
    var id = brgNode.id;
    db.ref('barang/' + id).remove();
  }
});

function brgRow(key, {barangNama, barangHarga, barangJenis, barangBatas}) {
  return `
    <td >${key}</td>
    <td class='barangNama' id='barangNama'>${barangNama}</td>
    <td class='barangJenis'>${barangJenis}</td>
    <td class='barangHarga'>${barangHarga}</td>
    <td class='barangBatas'>${barangBatas}</td>
    <td>
        <button class="edit btn btn-info"><span class="fa fa-pencil"></span></button>
        <button class="delete btn btn-danger "><span class="fa fa-trash"></span></button>
                </td>
  `
};

/////////////// END PAGE BARANG ///////////////////////////
