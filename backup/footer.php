<!-- ============================================================== -->
<!-- footer -->
<!-- ============================================================== -->
<footer class="footer">
    © 2017 SIP Developer Team. All right reserved.
</footer>
<!-- ============================================================== -->
<!-- End footer -->
<!-- ============================================================== -->
</div>
<!-- ============================================================== -->
<!-- End Page wrapper  -->
<!-- ============================================================== -->
</div>
<!-- ============================================================== -->
<!-- End Wrapper -->
<!-- ============================================================== -->
<!-- ============================================================== -->
<!-- All Jquery -->
<!-- ============================================================== -->
<script src="<?php echo base_url()?>assets/plugins/jquery/jquery.min.js"></script>
<!-- Bootstrap tether Core JavaScript -->
<script src="<?php echo base_url()?>assets/plugins/bootstrap/js/popper.min.js"></script>
<!-- This is data table -->
<script src="<?php echo base_url()?>assets/plugins/datatables/jquery.dataTables.min.js"></script>

<script src="<?php echo base_url()?>assets/plugins/bootstrap/js/bootstrap.min.js"></script>
<!-- slimscrollbar scrollbar JavaScript -->
<script src="<?php echo base_url()?>assets/js/jquery.slimscroll.js"></script>
<!--Wave Effects -->
<script src="<?php echo base_url()?>assets/js/waves.js"></script>
<!--Menu sidebar -->
<script src="<?php echo base_url()?>assets/js/sidebarmenu.js"></script>
<!--stickey kit -->
<script src="<?php echo base_url()?>assets/plugins/sticky-kit-master/dist/sticky-kit.min.js"></script>
<script src="<?php echo base_url()?>assets/plugins/sparkline/jquery.sparkline.min.js"></script>
<!--Custom JavaScript -->
<script src="<?php echo base_url()?>assets/js/custom.min.js"></script>
<!-- This is data table -->
<script src="<?php echo base_url()?>assets/plugins/datatables/jquery.dataTables.min.js"></script>
<!-- ============================================================== -->
<!-- Style switcher -->
<!-- ============================================================== -->
<script src="<?php echo base_url()?>assets/plugins/styleswitcher/jQuery.style.switcher.js"></script>
<script src="<?php echo base_url()?>assets/plugins/select2/dist/js/select2.full.min.js" type="text/javascript"></script>

    <script>
    $(document).ready(function() {
        // Basic
        $('#myTable').DataTable();
        // For select 2
        $(".select2").select2();
        $('.selectpicker').selectpicker();

        //cart
        $('.add_cart').click(function(){
         var brg_id = $(this).data("brgid");
         var brg_name = $(this).data("brgname");
         var brg_harga = $(this).data("brgharga");
         var qty = $('#' + brg_id).val();
         if(qty != '' && qty > 0)
         {
          $.ajax({
           url:"<?php echo site_url(); ?>Cpenjualan/tambah",
           method:"POST",
           data:{brg_id:brg_id, brg_name:brg_name, brg_harga:brg_harga, qty:qty},
           success:function(data)
           {
            alert("Product Added into Cart");
            $('#cart_details').html(data);
            $('#' + brg_id).val('');
           }
          });
         }
         else
         {
          alert("Please Enter quantity");
         }
        });

        $('#cart_details').load("<?php echo site_url(); ?>Cpenjualan/load");

        $(document).on('click', '.remove_inventory', function(){
 var row_id = $(this).attr("id");
 if(confirm("Are you sure you want to remove this?"))
 {
  $.ajax({
   url:"<?php echo site_url(); ?>Cpenjualan/remove",
   method:"POST",
   data:{row_id:row_id},
   success:function(data)
   {
    alert("Product removed from Cart");
    $('#cart_details').html(data);
   }
  });
 }
 else
 {
  return false;
 }
});

$(document).on('click', '#clear_cart', function(){
  if(confirm("Are you sure you want to clear cart?"))
  {
   $.ajax({
    url:"<?php echo base_url(); ?>shopping_cart/clear",
    success:function(data)
    {
     alert("Your cart has been clear...");
     $('#cart_details').html(data);
    }
   });
  }
  else
  {
   return false;
  }
 });


    });


    </script>

</body>

</html>
