<?php
    $folder = "../public/files/";

    $filename = $folder . time() . '_' . $_FILES['file']['name'];
    move_uploaded_file($_FILES["file"]["tmp_name"], $filename);
