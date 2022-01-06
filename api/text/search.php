<?php
//required headers

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=utf-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once "../../config/database.php";
include_once "../../models/text.php";

$database = new Database();
$db = $database->getConnection();
if($db){
    
    $text = new Text($db);
    $data = json_decode(file_get_contents("php://input"));

    $keywords = $data->keywords;
    $stmt = $text->search($keywords);

    // search text
    if($stmt){
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
                array("message" => "No Results Found")
            );
        }
    }

    else{
        echo json_encode(array("message" => "operation failed!"));
    }
    

}
?>