/////////////// PAGE STOK ///////////////////////////
var btnPemasukan = document.getElementById('btnPemasukan');
var txtmasuktgl   = document.getElementById('txtmasuktgl');
var txtmasuksumber    = document.getElementById('txtmasuksumber');
var txtmasuknilai    = document.getElementById('txtmasuknilai');
var txtmasuknote    = document.getElementById('txtmasuknote');
var hiddenID   = document.getElementById('hiddenID');

document.getElementById('txtmasuktgl').value = convertDate(todaysDate);

var tablemasuk = $('#masukTable').DataTable({
  "columnDefs": [
    { className: "masuktgl", "targets": [ 0 ]  },
    { className: "masuksumber", "targets": [ 1 ]  },
    { className: "masuknilai", "targets": [ 2 ]  },
    { className: "masuknote", "targets": [ 3 ]  },
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

btnPemasukan.addEventListener('click', (e) => {
  //e.preventDefault();

  if (!txtmasuktgl.value || !txtmasuksumber.value || !txtmasuknilai.value || !txtmasuknote.value) return null;

  var id = hiddenID.value || Date.now();

  db.ref('pemasukan/'+id).update({
    masuktgl: txtmasuktgl.value,
    masuksumber: txtmasuksumber.value,
    masuknilai: txtmasuknilai.value,
    masuknote: txtmasuknote.value
  });

  txtmasuktgl.value = '';
  txtmasuksumber.value  = '';
  txtmasuknilai.value = '';
  txtmasuknote.value = '';
  hiddenID.value = '';
});

var pemasukan = document.getElementById('masuktabel');
var masukkRef = db.ref('/pemasukan');

masukkRef.on('child_added', (data) => {
  /*var tr = document.createElement('tr')
  tr.id = data.key;
  tr.innerHTML = brgRow(data.val())
  barang.appendChild(tr);*/
  var dataSet = [
    data.val().masuktgl,
    data.val().masuksumber,
    data.val().masuknilai,
    data.val().masuknote,
    `<td>
    <button class="edit btn btn-info"><span class="fa fa-pencil"></span></button>
    <button class="delete btn btn-danger "><span class="fa fa-trash"></span></button>
    </td>`
  ];
  tablemasuk.rows.add([dataSet]).draw().nodes()
    .to$()
    .attr("id", data.key );
});

masukkRef.on('child_changed', (data) => {
  var masukNode = document.getElementById(data.key);
  masukNode.innerHTML = pemasukanRow(data.val());

});

masukkRef.on('child_removed', (data) => {
  var masukNode = document.getElementById(data.key);
  masukNode.parentNode.removeChild(masukNode);
});

pemasukan.addEventListener('click', (e) => {
  var masukNode = e.target.parentNode.parentNode

  // UPDATE REVEIW
  if (e.target.classList.contains('edit')) {
    txtmasuktgl.value = masukNode.querySelector('.masuktgl').innerText;
    txtmasuksumber.value  = masukNode.querySelector('.masuksumber').innerText;
    txtmasuknilai.value  = masukNode.querySelector('.masuknilai').innerText;
    txtmasuknote.value  = masukNode.querySelector('.masuknote').innerText;

    hiddenID.value = masukNode.id;
  }

  // DELETE REVEIW
  if (e.target.classList.contains('delete')) {
    var id = masukNode.id;
    db.ref('pemasukan/' + id).remove();
  }
});

function pemasukanRow({masuktgl, masuksumber,masuknilai, masuknote}) {
  return `
    <td class='masuktgl' id='masuktgl'>${masuktgl}</td>
    <td class='masuksumber'>${masuksumber}</td>
    <td class='masuknilai'>${masuknilai}</td>
      <td class='masuknote'>${masuknote}</td>
    <td>
        <button class="edit btn btn-info"><span class="fa fa-pencil"></span></button>
        <button class="delete btn btn-danger "><span class="fa fa-trash"></span></button>
        </td>
  `
};

/////////////// END PAGE STOK ///////////////////////////
