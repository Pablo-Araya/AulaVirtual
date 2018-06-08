<?php

    if(isset($_POST['FileName'])) {

        define('UPLOAD_DIR', 'uploads/');
        $img = $_POST['FileName'];
            $img = str_replace('data:image/jpeg;base64,', '', $img);
            $img = str_replace('data:image/png;base64,', '', $img);
            $img = str_replace(' ', '+', $img);
        $name = $_POST['nombre'];
        
        $data = base64_decode($img);
        $file = UPLOAD_DIR . $name;
        
        $success = file_put_contents($file, $data);
        
        echo $success ? $file : 'No se pudo guardar el fichero.';

    }else{

        echo "Error, debe selectar una imagen";

    }

?>
