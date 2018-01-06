<div class="row">
            <div class="col-12">

              <div class="card card-outline-info">
                <div class="card-header">
                  <div class="row">
               <div class="col-9">
                 <h3 class="card-title text-white">Stok Barang</h3>
               </div>
               <div class="col-3 text-right">
                  <input type="date" class="form-control" id="stokTgl">
               </div>
                </div>
                </div>

                <div class="card-body">

                <div class="row m-l-10">
                      <div class="col-lg-4">
                        <div class="form-group m-b-0">
                            <label>Barang</label>
                              <select class="select2 form-control custom-select" style="width: 100%; height:36px;" id="selkasirbrg">
                                  <optgroup label="Nama Barang" id="selbarang">
                                  </optgroup>
                              </select>
                          </div>
                      </div>
                      <div class="col-md-1">
                        <div class="form-group m-b-0">
                            <label for="recipient-name" class="control-label">Awal</label>
                            <input type="text" class="form-control" id="stokAwal">
                        </div>
                      </div>
                        <div class="col-md-1">
                        <div class="form-group m-b-0">
                            <label for="recipient-name" class="control-label">Sisa</label>
                            <input type="text" class="form-control" id="stokSisa">
                        </div>
                      </div>
                      <div class="col-md-1">
                        <div class="form-group m-b-0">
                            <label for="recipient-name" class="control-label">Retur</label>
                            <input type="text" class="form-control" id="stokRetur">
                        </div>
                      </div>
                      <div class="col-md-1 ">
                        <div class="form-group m-b-0">
                            <label for="recipient-name" class="control-label">Batas</label>
                            <input type="text" class="form-control" id="stokBatas">
                        </div>
                      </div>
                      <div class="col-md-2 m-t-30">
                          <button type="button" class="btn btn-warning" id="btnStok">Simpan</button>
                      </div>
                </div>
                <div class="row">

                </div>
               <div class="card-body p-t-0">
                   <div class="table-responsive">
                       <table id="stokTable" class="table table-bordered table-striped">
                           <thead>
                               <tr>
                                 <th>Nama</th>
                                 <th>Stok Awal</th>
                                 <th>Sisa</th>
                                 <th>Retur</th>
                                 <th>Batas Stok</th>
                                 <th>Aksi</th>
                               </tr>
                           </thead>
                           <tbody id="stoktabel" >

                           </tbody>
                       </table>

                       </ul>
                   </div>
               </div>
           </div>
           </div>

            </div>
        </div>
        <!-- /.modal -->
