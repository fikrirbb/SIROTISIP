<?php
    include("pages/header.php");

    $page = isset($_GET['page']) ? trim(strtolower($_GET['page']))       : "home";

    $allowedPages = array(
        'home'     => './pages/content.php',
        'barang'    => './pages/barang.php',
        'akun' => './pages/akun.php',
        'stok'  => './pages/stok.php',
        'pengeluaran'   => './pages/pengeluaran.php',
        'lappendapatan'   => './pages/lappendapatan.php',
        'laplabarugi'   => './pages/laplabarugi.php',
        'kasir'  => './pages/kasir.php'
    );

    include( isset($allowedPages[$page]) ? $allowedPages[$page] : $allowedPages["index"] );

    include("pages/footer.php");
?>
