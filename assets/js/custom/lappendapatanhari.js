document.getElementById('lapjualTglr').value = convertDate(todaysDate);
var lbrg;
gantihari();

$('#lapjualTglr').change(function() {
gantihari() ;
});

function gantihari() {

  var harireq = document.getElementById('lapjualTglr');
  var sum = 0;
  var pemasukan = document.getElementById('lapjualtabel');
  var masukkRef = db.ref('/transaksi').orderByChild("transaksitgl").equalTo(harireq.value);

  $('#lapjualtabel').empty();
  $('#totpendapatan').text("Rp. " +0+ ",-");
    var transaksittl=0;
    var tglNode;
  masukkRef.on('child_added', (data) => {
    var tgl = data.val().transaksitgl;
        var tr = document.createElement('tr')
        tr.id = tgl;

        tr.innerHTML = lapjualRow(transaksittl,data.val())
        pemasukan.appendChild(tr);


    // var tr = document.createElement('tr')
    // tr.id = data.key;
    //
    // tr.innerHTML = brgRow(data.val())
    // barang.appendChild(tr
    sum += parseInt(data.val().transaksitotal);
    $('#totpendapatan').text("Rp. " + sum + ",-");
  });

  function lapjualRow(transaksittl,{transaksitgl, transaksinote, transaksitotal}) {
      return `
        <td>${transaksitgl}</td>
        <td>${transaksinote}</td>
        <td class="subtot">Rp. ${transaksitotal}</td>
      `
  };

  var pengeluaran = document.getElementById('lapkeluartabel');
  var keluarRef = db.ref('/pengeluaran').orderByChild("keluartgl").equalTo(harireq.value);
  var sumkel=0;
  var keluarttl=0;
  var tglkeluarNode;
  $('#lapkeluartabel').empty();
  $('#totkeluar').text("Rp. " +0+ ",-");
  //pengeluaran.empty();
  keluarRef.on('child_added', (data) => {
  var tgl = data.val().keluartgl;
      keluarttl=parseInt(data.val().keluarjumlah);
      var tr = document.createElement('tr')
      tr.id = "kel"+tgl;

      tr.innerHTML = lapkeluarRow(keluarttl,data.val())
      pengeluaran.appendChild(tr);


  // var tr = document.createElement('tr')
  // tr.id = data.key;
  //
  // tr.innerHTML = brgRow(data.val())
  // barang.appendChild(tr
  sumkel += parseInt(data.val().keluarjumlah);
  $('#totkeluar').text("Rp. " + sumkel + ",-");
  });

  keluarRef.once('value', (data) => {
    lbrg = sum - sumkel;
    $('#labarugi').text("Rp. " + lbrg  + ",-");
  });

  function lapkeluarRow(keluarttl,{keluartgl, keluarnote, keluarjumlah}) {
    return `
      <td>${keluartgl}</td>
      <td>${keluarnote}</td>
      <td class="subtotkel">Rp. ${keluarjumlah}</td>
    `
  };
};
