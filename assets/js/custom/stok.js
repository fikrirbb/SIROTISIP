/////////////// PAGE STOK ///////////////////////////
var btnStok = document.getElementById('btnStok');
var barangNama   = document.getElementById('barangNama');
var barangJenis    = document.getElementById('barangJenis');
var barangHarga    = document.getElementById('barangHarga');
var hiddenID   = document.getElementById('hiddenID');

var tablestok = $('#stokTable').DataTable ({
  "columnDefs": [
    { className: "barangNama", "targets": [ 1 ]  },
      { className: "barangBatas", "targets": [ 3 ]  },
      { className: "barangStok", "targets": [ 4 ]  }
  ],
  "columns": [
    null,
    null,
    null,
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

  if (!barangBatas.value || !barangStok.value) return null;

  var id = hiddenID.value;

  db.ref('barang/' + id).update({
    barangBatas: barangBatas.value,
    barangStok: barangStok.value,
  });

  barangNama.value = '';
  barangBatas.value  = '';
  barangStok.value = '';
  hiddenID.value = '';
  $('#stokModal').modal('hide');
});

$('#stokModal').on('hide.bs.modal', function (e) {
  barangNama.value = '';
  barangBatas.value  = '';
  barangStok.value = '';
  hiddenID.value = '';
})

var stok = document.getElementById('stoktabel');
var stokRef = db.ref('/barang');

stokRef.on('child_added', (data) => {
  /*var tr = document.createElement('tr')
  tr.id = data.key;
  tr.innerHTML = brgRow(data.val())
  barang.appendChild(tr);*/
  var dataSet = [
    data.val().barangNama,
    data.val().barangJenis,
    data.val().barangHarga,
    data.val().barangBatas,
    data.val().barangStok,
    `<td>
    <button class="edit btn btn-info"><span class="fa fa-pencil"></span></button>
    </td>`];
  tablestok.rows.add([dataSet]).draw().nodes()
    .to$()
    .attr("id", data.key );
});

stokRef.on('child_changed', (data) => {
  var brgNode = document.getElementById(data.key);
  brgNode.innerHTML = stokRow(data.val());

});

stok.addEventListener('click', (e) => {
  var brgNode = e.target.parentNode.parentNode

  // UPDATE REVEIW
  if (e.target.classList.contains('edit')) {
    $('#stokModal').modal('show');
    barangNama.value = brgNode.querySelector('.barangNama').innerText;
    barangBatas.value  = brgNode.querySelector('.barangBatas').innerText;
    barangStok.value  = brgNode.querySelector('.barangStok').innerText;
    hiddenID.value = brgNode.id;
  }
  //
  // // DELETE REVEIW
  // if (e.target.classList.contains('delete')) {
  //   var id = brgNode.id;
  //   db.ref('barang/' + id).remove();
  // }
});

function stokRow({barangNama, barangHarga, barangJenis, barangBatas, barangStok}) {
  return `
    <td class='barangNama' id='barangNama'>${barangNama}</td>
    <td class='barangJenis'>${barangJenis}</td>
    <td class='barangHarga'>${barangHarga}</td>
      <td class='barangHarga'>${barangBatas}</td>
        <td class='barangHarga'>${barangStok}</td>
    <td>
        <button class="edit btn btn-info"><span class="fa fa-pencil"></span></button>
  </td>
  `
};

/////////////// END PAGE STOK ///////////////////////////
