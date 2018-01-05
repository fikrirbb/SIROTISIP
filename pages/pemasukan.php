<div class="row">
            <div class="col-12">

              <div class="card card-outline-info">
                <div class="card-header">
                  <div class="row">
               <div class="col-6">
                 <h3 class="card-title text-white">Pemasukan</h3>
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
                                                        <input type="date" class="form-control" id="txtmasuktgl">
                                                    </div>
                                                </div>
                                                <div class="form-group row">
                                                    <label class="control-label text-right col-md-3">Sumber</label>
                                                    <div class="col-md-9">
                                                        <input type="text" class="form-control" id="txtmasuksumber">
                                                    </div>
                                                </div>
                                                <div class="form-group row">
                                                    <label class="control-label text-right col-md-3">Jumlah</label>
                                                    <div class="col-md-9">
                                                        <input type="text" class="form-control" id="txtmasuknilai">
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-md-6  p-l-0">
                                                <div class="form-group row m-b-10">
                                                    <label class="control-label text-right col-md-3 p-l-0">Catatan</label>
                                                    <div class="col-md-9">
                                                      <textarea class="form-control" rows="5" id="txtmasuknote"></textarea>
                                                    </div>
                                                </div>
                                                <div class="text-right">
                                                  <button type="button" class="col-md-9 btn btn-info waves-effect waves-light" id="btnPemasukan">Simpan</button>
                                                </div>
                                            </div>
                                        </div>

                                        <!--/row-->
 <hr class="m-b-0">
                   <div class="table-responsive">
                       <table id="masukTable" class="table table-bordered table-striped">
                           <thead>
                               <tr>
                                 <th>Tanggal</th>
                                 <th>Sumber</th>
                                 <th>Nilai</th>
                                 <th>Catatan</th>
                                 <th>Aksi</th>
                               </tr>
                           </thead>
                           <tbody id="masuktabel" >

                           </tbody>
                       </table>

                       </ul>
                   </div>
               </div>
           </div>

            </div>
        </div>
