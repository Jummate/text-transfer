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
        
    $text->ID = $data->ID;
    $text->user_text = $data->text;
    $text->description = $data->description;
    $text->time_stamp = $data->time_stamp;

    // Create text
    if($text->create()){
        echo json_encode(array("message" => "Text created Successfully!"));
    }
    else{
        echo json_encode(array("message" => "operation failed!"));
    }
   
}



?>