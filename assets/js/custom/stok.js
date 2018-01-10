// var btsstok = document.getElementById('batasStok');
// var brgRef = db.ref('/barang');
//
// stokRef.on('child_added', (data) => {
//   /*var tr = document.createElement('tr')
//   tr.id = data.key;
//   tr.innerHTML = brgRow(data.val())
//   barang.appendChild(tr);*/
// });




/////////////// PAGE STOK ///////////////////////////
var btnStok = document.getElementById('btnStok');
var barangNama   = document.getElementById('barangNama');
var stokAwal    = document.getElementById('stokAwal');
var stokTgl    = document.getElementById('stokTgl');
var stokSisa    = document.getElementById('stokSisa');
var stokRetur    = document.getElementById('stokRetur');
var hiddenID   = document.getElementById('hiddenID');


document.getElementById('stokTgl').value = convertDate(todaysDate);

var tablestok = $('#stokTable').DataTable ({
  "columnDefs": [
    { className: "barangNama", "targets": [ 0 ]  },
      { className: "stokAwal", "targets": [ 1 ]  },
      { className: "stokSisa", "targets": [ 2 ]  },
      { className: "stokRetur", "targets": [ 3 ]  },
  ],
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
    null

  ],
  "lengthMenu": [5, 10, 20, 50, 100],
  "pageLength": 5
  //'createdRow': function( row, data, dataIndex ) {
      //$(row).attr('id', data.key);
  //}
});

btnStok.addEventListener('click', (e) => {
  //e.preventDefault();

  if (!stokTgl.value || !stokAwal.value || !stokSisa.value || !stokRetur.value ) return null;


//  var id = hiddenID.value;

  db.ref('stok/'+ stokTgl.value + '/' + selkasirbrg.value).update({
    stokAwal: stokAwal.value,
    stokSisa: stokSisa.value,
    stokRetur: stokRetur.value
  });

  resetstok();
});

function resetstok() {
$('#selkasirbrg').val(null).trigger('change');
  stokAwal.value  = null;
  stokSisa.value = null;
  stokRetur.value = null;
}

var stok = document.getElementById('stoktabel');
var brgRef = db.ref('/barang');
var stokRef = db.ref('/stok').child(stokTgl.value);

stokRef.on('child_added', (data) => {
  /*var tr = document.createElement('tr')
  tr.id = data.key;
  tr.innerHTML = brgRow(data.val())
  barang.appendChild(tr);*/

  var keyid = data.key;
  var awal, sisa, retur, batas;
    console.log(stokTgl.value);
    brgRef.child(keyid).once('value', function(dbarang) {
      brgnama = dbarang.val().barangNama;

      var dataSet = [
        brgnama,
        data.val().stokAwal,
        data.val().stokSisa,
      data.val().stokRetur,
        `<td>
        <button class="edit btn btn-info"><span class="fa fa-pencil"></span></button>
        </td>`];
      tablestok.rows.add([dataSet]).draw().nodes()
        .to$()
        .attr("id", data.key );
  });


});

stokRef.on('child_changed', (data) => {
  var stokNode = document.getElementById(data.key);
  //brgNode.innerHTML = stokRow(data.val());

  var awal, sisa, retur, batas;
    console.log(stokTgl.value);
    brgRef.child(data.key).once('value', function(dbarang) {
      brgnama = dbarang.val().barangNama;

      stokNode.innerHTML = stokRow(brgnama,data.val());
  });

});

stok.addEventListener('click', (e) => {
  var stokNode = e.target.parentNode.parentNode

  // UPDATE REVEIW
  if (e.target.classList.contains('edit')) {
    $('#selkasirbrg').val(stokNode.id).trigger('change');
    stokAwal.value = stokNode.querySelector('.stokAwal').innerText;
    stokSisa.value = stokNode.querySelector('.stokSisa').innerText;
    stokRetur.value = stokNode.querySelector('.stokRetur').innerText;
    //hiddenID.value = brgNode.id;
  }
  //
  // // DELETE REVEIW
  // if (e.target.classList.contains('delete')) {
  //   var id = brgNode.id;
  //   db.ref('barang/' + id).remove();
  // }
});

function stokRow(brgnama, {stokAwal, stokSisa, stokRetur, stokBatas}) {
  return `
    <td class='barangNama' id='barangNama'>${brgnama}</td>
    <td class='stokAwal'>${stokAwal}</td>
    <td class='stokSisa'>${stokSisa}</td>
      <td class='stokRetur'>${stokRetur}</td>
    <td>
        <button class="edit btn btn-info"><span class="fa fa-pencil"></span></button>
  </td>
  `
};

/////////////// END PAGE STOK ///////////////////////////
