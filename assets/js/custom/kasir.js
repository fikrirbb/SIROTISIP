var optionRef = db.ref('/barang');
var selbarang = document.getElementById('selbarang');
var selkasirbrg    = document.getElementById('selkasirbrg');
$(".select2").select2({
   placeholder: "Pilih Barang"
});

optionRef.once('value', function(snapshot) {
  snapshot.forEach(function(data) {
    var option = document.createElement('option');
    var datav = data.val();
     option.value = data.key;
     option.text = datav.barangNama;
     selbarang.appendChild(option);
    // ...
  });
});

// optionRef.on('child_added', (data) => {
//    console.log(data.val());
//    var option = document.createElement('option');
//    var datav = data.val();
//     option.value = data.key;
//     option.text = datav.barangNama;
//     selbarang.appendChild(option);
//
// }, function (error) {
//    console.log("Error: " + error.code);
// });

document.getElementById('txtkasirtgl').value = convertDate(todaysDate);
document.getElementById('txtkasirfaktur').value = "SIP-"+Date.now();



/////////////// PAGE STOK ///////////////////////////
var btnkasir = document.getElementById('btnkasir');
var txtkasirtgl   = document.getElementById('txtkasirtgl');
var txtkasirqty    = document.getElementById('txtkasirqty');
var txtkasirfaktur    = document.getElementById('txtkasirfaktur');
var btnsum = document.getElementById('btnsum');
var txtbanyak = document.getElementById('txtbanyak');
var btnBayar =  document.getElementById('btnBayar');
var txtbayar = document.getElementById('txtbayar');
var txtkasirnote = document.getElementById('txtkasirnote');

//var txtkasirnote    = document.getElementById('txtkasirnote');
var hiddenID   = document.getElementById('hiddenID');

var tablekasir = $('#kasirTable').DataTable({
  // "columnDefs": [
  //   { className: "kasirtgl", "targets": [ 0 ]  },
  //   { className: "kasirsumber", "targets": [ 1 ]  },
  //   { className: "kasirnilai", "targets": [ 2 ]  },
  //   { className: "kasirnote", "targets": [ 3 ]  },
  // ],
  // "columns": [
  //   null,
  //   null,
  //   null,
  //   {
  //     "defaultContent": "0"
  //   },
  //   {
  //     "defaultContent": "0"
  //   },
  //   null
  //
  // ],
  "lengthMenu": [5, 10, 20, 50, 100],
  "pageLength": 5
  //'createdRow': function( row, data, dataIndex ) {
      //$(row).attr('id', data.key);
  //}
});

btnkasir.addEventListener('click', (e) => {
  //e.preventDefault();

  if (!txtkasirtgl.value || !selkasirbrg.value || !txtkasirqty.value) return null;

  //var id = hiddenID.value || "#"+Date.now();

  db.ref('transaksiDetail/').push().set({
    detbrg: selkasirbrg.value,
    detqty: txtkasirqty.value,
    detnota: txtkasirfaktur.value
  });

  var sisa2, awal, retur;
    db.ref('stok/'+ txtkasirtgl.value + '/' + selkasirbrg.value).once('value', function(snapshot) {

      console.log(selkasirbrg.value);
      awal = snapshot.val().stokAwal;
      retur = snapshot.val().stokRetur;
     sisa2 = snapshot.val().stokSisa - txtkasirqty.value;
     console.log(sisa2);
    db.ref('stok/'+ txtkasirtgl.value + '/' + selkasirbrg.value).update({
        //stokAwal: awal,
        //stokRetur: retur,
        stokSisa: sisa2,
    });
    reset();
  });
});

function reset() {
  //txtkasirtgl.value = convertDate(todaysDate);
  $('#selkasirbrg').val(null).trigger('change');
  txtkasirqty.value = null;
  $('#kasirModal').modal('hide');
  txtbayar.value = null;

}

btnBayar.addEventListener('click', (e) => {
  if (parseInt(txtbayar.value) < hiddenID.value) return null;
  var catat;
  if (!txtkasirnote.value) {
      catat = "Penjualan Kasir";
  }else {
      catat = txtkasirnote.value
  };

  db.ref('transaksi/'+ txtkasirfaktur.value).set({
    transaksitgl: txtkasirtgl.value,
    transaksitotal: hiddenID.value,
    transaksibayar: txtbayar.value,
    transaksinote: catat
  });

$('#kasirModal').modal('hide');
 var kembalian = parseInt(txtbayar.value) - parseInt(hiddenID.value)
  swal({
            title: "Kembalian Rp. " + kembalian + ",-",
            text: "Selamat Berbelanja Kembali !",
            type: "success"
        }, function() {
            location.reload();
        });

});

var tblkasir = document.getElementById('kasirtabel');
var kasirRef = db.ref('/transaksiDetail').orderByChild("detnota").equalTo(txtkasirfaktur.value);
var brgRef = db.ref('/barang');

kasirRef.on('child_added', (data) => {

  var brgid = data.val().detbrg; // line 1 (results like 1,2,3,4,5,6)
  var brgnama, brgharga, brgstok;
    brgRef.child(brgid).once('value', function(dbarang) {
      brgnama = dbarang.val().barangNama;
      brgid = dbarang.key;
      brgharga = dbarang.val().barangHarga;
      brgstok = dbarang.val().barangStok;

  var subtotal = data.val().detqty*brgharga;
  var tr = document.createElement('tr')
  tr.id = data.key;
  tr.innerHTML = kasirUlang(brgid, brgnama, brgstok, brgharga, subtotal, data.val())
  tblkasir.appendChild(tr);
  //console.log(data);

  sumbtn();

  // console.log(brgid + ":" + mediaSnap.val().barangNama);
});

}, function (error) {
   console.log("Error: " + error.code);
});

function sumbtn() {
  var sum = 0;
  $('.subtot').each(function() {
      sum += Number($(this).text());
  });

  $('#btnsum').val("Bayar Rp. " + sum + ",-");
  $('#txtbanyak').text("Rp. " + sum + ",-");
  hiddenID.value = sum;
}

kasirRef.on('child_removed', (data) => {
  var kasirNode = document.getElementById(data.key);
  kasirNode.parentNode.removeChild(kasirNode);
  sumbtn();
});

tblkasir.addEventListener('click', (e) => {
  var kasirNode = e.target.parentNode.parentNode

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
    var id = kasirNode.id;
    var brgid = kasirNode.querySelector('.brgid').innerText;
    var qty = kasirNode.querySelector('.kasirqty').innerText;
    db.ref('transaksiDetail/' + id).remove();

    var sisa2, awal, retur;
      db.ref('stok/'+ txtkasirtgl.value + '/' + brgid).once('value', function(snapshot) {

        console.log(brgid);
        awal = snapshot.val().stokAwal;
        retur = snapshot.val().stokRetur;
       sisa2 = snapshot.val().stokSisa + parseInt(qty);
       console.log(sisa2);
      db.ref('stok/'+ txtkasirtgl.value + '/' + brgid).update({
          //stokAwal: awal,
          //stokRetur: retur,
          stokSisa: sisa2,
      });
    });

  }
});

function kasirUlang(brgid, brgnama, brgstok, brgharga, subtotal, {detbrg, detnota, detqty, dettgl}) {
  return `
  <td class="brgid" hidden>${brgid}</td>
  <td>${brgnama}</td>
  <td class="kasirqty">${detqty}</td>
    <td>${brgharga}</td>
    <td class="subtot">${subtotal}</td>
    <td>
      <button class="delete btn btn-danger "><span class="fa fa-trash"></span></button>
    </td>
  `
};



/////////////// END PAGE STOK ///////////////////////////
