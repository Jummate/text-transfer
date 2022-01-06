<?php
//required headers

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=utf-8");
header("Access-Control-Allow-Methods: DELETE");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once "../../config/database.php";
include_once "../../models/text.php";

$database = new Database();
$db = $database->getConnection();
if($db){
    echo "Connected Successfully!! to the database";
}

$text = new Text($db);
$data = json_decode(file_get_contents("php://input"));

$text->ID = $data->ID;

// Delete text
if($text->delete()){
    echo json_encode(array("message" => "Text deleted Successfully!"));
}
else{
    echo json_encode(array("message" => "operation failed!"));
}

?>