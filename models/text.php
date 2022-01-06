<?php

class Text{
    // DB stuff
    private $conn;
    private $dataTable = 'text_info';

    // properties

    public $ID;
    public $user_text;
    public $description;
    public $time_stamp;

    public function __construct($db){
        $this->conn = $db;
    }

    public function create(){
        $query = "INSERT INTO " .$this->dataTable. " SET ID = :ID, user_text = :user_text, description = :description, time_stamp = :time_stamp";
        //$query = "INSERT INTO ".$this->dataTable.

        //prepare query
        $stmt = $this->conn->prepare($query);
        
        // sanitize data
        $this->ID = htmlspecialchars(strip_tags($this->ID));
        $this->user_text = htmlspecialchars(strip_tags($this->user_text));
        $this->description = htmlspecialchars(strip_tags($this->description));
        $this->time_stamp = htmlspecialchars(strip_tags($this->time_stamp));

        // bind values
        $stmt->bindParam(":ID",$this->ID);
        $stmt->bindParam(":user_text",$this->user_text);
        $stmt->bindParam(":description",$this->description);
        $stmt->bindParam(":time_stamp",$this->time_stamp);

        
        // execute query
        if($stmt->execute()){
            return true;
        }
        
        echo $stmt->errorCode();
        return false;

    }

    public function read(){
        $query = "SELECT * FROM " .$this->dataTable;

        $stmt = $this->conn->prepare($query);

        $stmt->execute();

        return $stmt;
    }

    public function delete(){
        $query = "DELETE FROM " . $this->dataTable . " WHERE ID = :ID";
        $stmt = $this->conn->prepare($query);

        $this->ID = htmlspecialchars(strip_tags($this->ID));
        $stmt->bindParam(":ID",$this->ID);

        $stmt->execute();
        return $stmt;
    }

    public function search($keywords){
        $query = "SELECT * FROM " .$this->dataTable." WHERE user_text LIKE :user_text OR description LIKE :description";

        $stmt = $this->conn->prepare($query);
        $keywords = htmlspecialchars(strip_tags($keywords));
        $keywords = "%".$keywords."%";

        $stmt->bindParam(":user_text", $keywords);
        $stmt->bindParam(":description", $keywords);
        $stmt->execute();

        return $stmt;
    }
}

?>