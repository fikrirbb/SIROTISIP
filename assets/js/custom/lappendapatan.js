document.getElementById('lapjualTgl').value = convertMonth(todaysDate);
var lbrg;
gantibulan();

$('#lapjualTgl').change(function() {
gantibulan() ;
});

function gantibulan() {

  var bulanreq = document.getElementById('lapjualTgl');
  var sum = 0;
  var pemasukan = document.getElementById('lapjualtabel');
  var masukkRef = db.ref('/transaksi').orderByChild("transaksitgl").startAt(bulanreq.value+"-01").endAt(bulanreq.value+"-31");

  $('#lapjualtabel').empty();
  $('#totpendapatan').text("Rp. " +0+ ",-");
    var transaksittl=0;
    var tglNode;
  masukkRef.on('child_added', (data) => {
    var tgl = data.val().transaksitgl;

      if ($("#"+tgl).length) {
          transaksittl += parseInt(data.val().transaksitotal);
          tglNode = document.getElementById(tgl);
          tglNode.innerHTML = lapjualRow(transaksittl,data.val());
      }else {
        transaksittl=parseInt(data.val().transaksitotal);
        var tr = document.createElement('tr')
        tr.id = tgl;

        tr.innerHTML = lapjualRow(transaksittl,data.val())
        pemasukan.appendChild(tr);
      }

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
        <td class="subtot">Rp. ${transaksittl}</td>
      `
  };

  var pengeluaran = document.getElementById('lapkeluartabel');
  var keluarRef = db.ref('/pengeluaran').orderByChild("keluartgl").startAt(bulanreq.value+"-01").endAt(bulanreq.value+"-31");
  var sumkel=0;
  var keluarttl=0;
  var tglkeluarNode;
  $('#lapkeluartabel').empty();
  $('#totkeluar').text("Rp. " +0+ ",-");
  //pengeluaran.empty();
  keluarRef.on('child_added', (data) => {
  var tgl = data.val().keluartgl;

    if ($("#kel"+tgl).length) {
        keluarttl += parseInt(data.val().keluarjumlah);
        tglkeluarNode = document.getElementById("kel"+tgl);
        tglkeluarNode.innerHTML = lapkeluarRow(keluarttl,data.val());
    }else {
      keluarttl=parseInt(data.val().keluarjumlah);
      var tr = document.createElement('tr')
      tr.id = "kel"+tgl;

      tr.innerHTML = lapkeluarRow(keluarttl,data.val())
      pengeluaran.appendChild(tr);
    }

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
      <td class="subtotkel">Rp. ${keluarttl}</td>
    `
  };
};
