

<?php
//required headers

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET");
//header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers");


include_once "../../config/database.php";
include_once "../../models/text.php";

$database = new Database();
$db = $database->getConnection();
// if($db){
//     echo "Connected Successfully!! to the database";
// }

$text = new Text($db);

$stmt = $text->read();
$num = $stmt->rowCount();

if($num > 0){
    $texts_arr = array();
    $texts_arr["data"] = array();

    while($row = $stmt->fetch(PDO::FETCH_ASSOC)){
        extract($row);

        if($user_text){
            $text_item = array(
                "id" => $ID,
                "user_text" => $user_text,
                "description" => $description,
                "timestamp" => $time_stamp
            );
            array_push($texts_arr["data"], $text_item);
        }
        

        
    }
   
    echo json_encode($texts_arr);
}
else{
    echo json_encode(
        array("message" => "No Texts Found")
    );
}

    
?>