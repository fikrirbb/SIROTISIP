document.getElementById('lapjualTgl').value = convertMonth(todaysDate);

var bulanreq = document.getElementById('lapjualTgl');

var pemasukan = document.getElementById('lapjualtabel');
var masukkRef = db.ref('/transaksi').orderByChild("transaksitgl").startAt(bulanreq.value+"-01").endAt(bulanreq.value+"-31");

  var transaksittl=0;
  var tglNode;
masukkRef.on('child_added', (data) => {
  var tgl = data.val().transaksitgl;

    if ($("#"+tgl).length) {
        transaksittl += parseInt(data.val().transaksitotal);
        tglNode = document.getElementById(tgl);
        tglNode.innerHTML = lapjualRow(transaksittl,data.val());
console.log(transaksittl);
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
});

function lapjualRow(transaksittl,{transaksitgl, transaksinote, transaksitotal}) {
    return `
      <td>${transaksitgl}</td>
      <td>${transaksinote}</td>
      <td>${transaksittl}</td>
    `
};
