<div class="row">
            <div class="col-12">
              <div class="card card-outline-info">
                <div class="card-header">
                 <h3 class="card-title text-white">Kasir</h3>
                </div>
                  <div class="card-body">
                    <div class="row">
                      <div class="col-md-7">
                        <div class="row">
                          <div class="col-lg-4">
                            <div class="form-group">
                                <label>No Faktur</label>
                                <div class="input-group">
                                    <input type="text" name="faktur" class="form-control" id="txtkasirfaktur" readonly> </div>
                            </div>
                          </div>
                          <div class="col-lg-7 p-r-0">
                            <div class="form-group">
                                <label>Barang</label>
                                <select class="select2 form-control custom-select" style="width: 100%; height:36px;" id="selkasirbrg">
                                    <optgroup label="Nama Barang" id="selbarang">
                                    </optgroup>
                                </select>
                            </div>
                            </div>
                            <div class="col-lg-4">
                              <div class="form-group">
                                  <label>Tanggal</label>
                                  <div class="input-group">
                                      <input type="date" name="tgl" class="form-control" aria-invalid="false" id="txtkasirtgl"> </div>
                              </div>
                            </div>
                            <div class="col-lg-3">
                              <div class="form-group">
                                  <label>Banyak Barang</label>
                                  <div class="input-group">
                                      <input type="number" name="qty" class="form-control" placeholder="Qty" id="txtkasirqty"> </div>
                              </div>
                            </div>
                            <div class="col-lg-2 m-t-30">
                              <button type="submit" class="btn btn-info" id="btnkasir">Tambah</button>
                            </div>
                        </div>
                      </div>
                      <div class="col-md-5 p-l-0">
                         <div class="col-md-11">
                          <div class="form-group">
                              <label>Catatan</label>
                              <div class="input-group">
                                  <textarea class="form-control" rows="2" id="txtkasirnote"></textarea>
                                </div>
                          </div>
                        </div>
                        <div class="row">
                          <div class="col-md-11 ">
                            <input type="button" class="btn btn-block btn-lg btn-info" id="btnsum" value="Bayar Rp 0,-" data-toggle="modal" data-target="#kasirModal"></input>
                          </div>
                        </div>

                      </div>
                    </div>

                    <div class="table-responsive">
                        <table class="table table-bordered table-striped">
                            <thead>
                                <tr>
                                  <th>Nama Barang</th>
                                  <th>Banyak</th>
                                  <th>Stok</th>
                                  <th>Harga</th>
                                  <th>Sub Total</th>
                                  <th>Aksi</th>
                                </tr>
                            </thead>
                            <tbody id="kasirtabel" >

                            </tbody>
                        </table>

                        </ul>
                    </div>
                  <!--  <div class="table-responsive">
<table class="table table-bordered color-bordered-table info-bordered-table">
<thead>
<tr>
    <th>#</th>
    <th>Nama Barang</th>
    <th>Qty</th>
    <th>Harga @</th>
    <th>Sub Total</th>
    <th><button onclick="hapusSemua()" class="btn btn-default hapus-semua">Hapus Semua</button>
</tr>
</thead>
<tbody>
  <?php /*foreach ($this->cart->contents() as $items){ ?>
    <tr>
      <td><?= $items['id'] ?></td>
      <td><?= $items['name'] ?></td>
      <td><?= $items['qty'] ?></td>
      <td><?= $items['price'] ?></td>
      <td><?= $total = $items['price']*$items['qty'] ?></td>
      <td><a onClick='delete_row("<?= $items['rowid'] ?>")'>Hapus</a></td>
    </tr>
  <?php
  }
  */?>
</tbody>
</table>
</div> -->

                  </div>
              </div>
            </div>
        </div>


        <div class="modal fade" id="kasirModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel1">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h4 class="modal-title" id="exampleModalLabel1">Pembayaran</h4>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                    </div>
                    <div class="modal-body">
                      <center>
                        <input type="number" name="" value="" id="hiddenID" hidden>
                        <h5>Total Yang harus dibayar: </h5>
                        <br>
                        <h1 id="txtbanyak">Rp 0,-</h1>
                        <br>
                        <div class="col-md-8">
                          <div class="form-group m-b-0">
                              <label for="recipient-name" class="control-label">Uang Anda:</label>
                              <input type="text" class="form-control" id="txtbayar">
                          </div>
                        </div>
                          </center>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-warning" id="btnBayar">Bayar</button>
                    </div>
                </div>
            </div>
        </div>
        <!-- /.modal -->
