<div class="row">
            <div class="col-12">

              <div class="card card-outline-info">
                <div class="card-header">
                  <div class="row">
               <div class="col-6">
                 <h3 class="card-title text-white">Pengeluaran</h3>
               </div>
                </div>
                </div>
               <div class="card-body">

                 <!--/row-->
                                        <div class="row">
                                            <div class="col-md-5">
                                              <input type="hidden" name="" value="" id="hiddenID">
                                                <div class="form-group row">
                                                    <label class="control-label text-right col-md-3">Tanggal</label>
                                                    <div class="col-md-9">
                                                        <input type="date" class="form-control" id="txtkeluartgl">
                                                    </div>
                                                </div>
                                                <div class="form-group row">
                                                    <label class="control-label text-right col-md-3">Perihal</label>
                                                    <div class="col-md-9">
                                                        <input type="text" class="form-control" id="txtkeluarsumber">
                                                    </div>
                                                </div>
                                                <div class="form-group row">
                                                    <label class="control-label text-right col-md-3">Jumlah</label>
                                                    <div class="col-md-9">
                                                        <input type="text" class="form-control" id="txtkeluarnilai">
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-md-6  p-l-0">
                                                <div class="form-group row m-b-10">
                                                    <label class="control-label text-right col-md-3 p-l-0">Catatan</label>
                                                    <div class="col-md-9">
                                                      <textarea class="form-control" rows="5" id="txtkeluarnote"></textarea>
                                                    </div>
                                                </div>
                                                <div class="text-right">
                                                  <button type="button" class="col-md-9 btn btn-info waves-effect waves-light" id="btnPengeluaran">Simpan</button>
                                                </div>
                                            </div>
                                        </div>

                                        <!--/row-->
 <hr class="m-b-0">
                   <div class="table-responsive">
                       <table id="keluarTable" class="table table-bordered table-striped">
                           <thead>
                               <tr>
                                 <th>Tanggal</th>
                                 <th>Perihal</th>
                                 <th>Jumlah</th>
                                 <th>Catatan</th>
                                 <th>Aksi</th>
                               </tr>
                           </thead>
                           <tbody id="keluartabel" >

                           </tbody>
                       </table>

                       </ul>
                   </div>
               </div>
           </div>

            </div>
        </div>
