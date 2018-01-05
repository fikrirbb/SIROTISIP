<div class="row">
            <div class="col-12">

              <div class="card card-outline-info">
                <div class="card-header">
                  <div class="row">
               <div class="col-6">
                 <h3 class="card-title text-white">Stok Barang</h3>
               </div>
                </div>
                </div>
               <div class="card-body p-t-0">
                   <div class="table-responsive">
                       <table id="stokTable" class="table table-bordered table-striped">
                           <thead>
                               <tr>
                                 <th>Nama</th>
                                 <th>Jenis</th>
                                 <th>Harga</th>
                                 <th>Batas Stok</th>
                                 <th>Stok</th>
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


        <div class="modal fade" id="stokModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel1">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h4 class="modal-title" id="exampleModalLabel1">Edit Stok</h4>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                    </div>
                    <form>
                    <div class="modal-body">
                          <input type="hidden" id="hiddenID"/>
                            <div class="form-group">
                                <label for="recipient-name" class="control-label">Nama Barang</label>
                                <input type="text" class="form-control" id="barangNama">
                            </div>
                            <div class="form-group">
                                <label for="recipient-name" class="control-label">Batas Stok</label>
                                <input type="text" class="form-control" id="barangBatas">
                            </div>
                            <div class="form-group">
                                <label for="recipient-name" class="control-label">Stok Brang</label>
                                <input type="text" class="form-control" id="barangStok">
                            </div>
                            <!-- <div class="form-group">
                                <label for="message-text" class="control-label">Message:</label>
                                <textarea class="form-control" id="message-text1"></textarea>
                            </div> -->
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-warning" id="btnStok">Update</button>
                    </div>
                    </form>
                </div>
            </div>
        </div>
        <!-- /.modal -->
