/////////////// PAGE STOK ///////////////////////////
var btnPengeluaran = document.getElementById('btnPengeluaran');
var txtkeluartgl   = document.getElementById('txtkeluartgl');
var txtkeluarsumber    = document.getElementById('txtkeluarsumber');
var txtkeluarnilai    = document.getElementById('txtkeluarnilai');
var txtkeluarnote    = document.getElementById('txtkeluarnote');
var hiddenID   = document.getElementById('hiddenID');

document.getElementById('txtkeluartgl').value = convertDate(todaysDate);

var tablekeluar = $('#keluarTable').DataTable({
  "columnDefs": [
    { className: "keluartgl", "targets": [ 0 ]  },
    { className: "keluarsumber", "targets": [ 1 ]  },
    { className: "keluarnilai", "targets": [ 2 ]  },
    { className: "keluarnote", "targets": [ 3 ]  },
  ],
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

btnPengeluaran.addEventListener('click', (e) => {
  //e.preventDefault();

  if (!txtkeluartgl.value || !txtkeluarsumber.value || !txtkeluarnilai.value) return null;

  var id = hiddenID.value || Date.now();

  var catat;
  if (!txtkeluarnote.value) {
      catat = txtkeluarsumber.value;
  }else {
      catat = txtkeluarnote.value;
  };

  db.ref('pengeluaran/'+id).update({
    keluartgl: txtkeluartgl.value,
    keluarperihal: txtkeluarsumber.value,
    keluarjumlah: txtkeluarnilai.value,
    keluarnote: catat
  });

  txtkeluarsumber.value  = '';
  txtkeluarnilai.value = '';
  txtkeluarnote.value = '';
  hiddenID.value = '';
});

var pengeluaran = document.getElementById('keluartabel');
var keluarkRef = db.ref('/pengeluaran');

keluarkRef.on('child_added', (data) => {
  /*var tr = document.createElement('tr')
  tr.id = data.key;
  tr.innerHTML = brgRow(data.val())
  barang.appendChild(tr);*/
  var dataSet = [
    data.val().keluartgl,
    data.val().keluarperihal,
    data.val().keluarjumlah,
    data.val().keluarnote,
    `<td>
    <button class="edit btn btn-info"><span class="fa fa-pencil"></span></button>
    <button class="delete btn btn-danger "><span class="fa fa-trash"></span></button>
    </td>`
  ];
  tablekeluar.rows.add([dataSet]).draw().nodes()
    .to$()
    .attr("id", data.key );
});

keluarkRef.on('child_changed', (data) => {
  var keluarNode = document.getElementById(data.key);
  keluarNode.innerHTML = pengeluaranRow(data.val());

});

keluarkRef.on('child_removed', (data) => {
  var keluarNode = document.getElementById(data.key);
  keluarNode.parentNode.removeChild(keluarNode);
});

pengeluaran.addEventListener('click', (e) => {
  var keluarNode = e.target.parentNode.parentNode

  // UPDATE REVEIW
  if (e.target.classList.contains('edit')) {
    txtkeluartgl.value = keluarNode.querySelector('.keluartgl').innerText;
    txtkeluarsumber.value  = keluarNode.querySelector('.keluarsumber').innerText;
    txtkeluarnilai.value  = keluarNode.querySelector('.keluarnilai').innerText;
    txtkeluarnote.value  = keluarNode.querySelector('.keluarnote').innerText;

    hiddenID.value = keluarNode.id;
  }

  // DELETE REVEIW
  if (e.target.classList.contains('delete')) {
    var id = keluarNode.id;
    db.ref('pengeluaran/' + id).remove();
  }
});

function pengeluaranRow({keluartgl, keluarperihal ,keluarjumlah,keluarnote}) {
  return `
    <td class='keluartgl' id='keluartgl'>${keluartgl}</td>
    <td class='keluarsumber'>${keluarperihal}</td>
    <td class='keluarnilai'>${keluarjumlah}</td>
      <td class='keluarnote'>${keluarnote}</td>
    <td>
        <button class="edit btn btn-info"><span class="fa fa-pencil"></span></button>
        <button class="delete btn btn-danger "><span class="fa fa-trash"></span></button>
        </td>
  `
};

/////////////// END PAGE STOK ///////////////////////////
