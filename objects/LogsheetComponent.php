<?php
    class LogsheetComponent {
        protected $db;
        protected $id;
        
        public function __construct($db) {
            $this->db = $db;
        }
        
        //put error checking here to make sure id is an integer
        public function setId($component_id) {
            $this->id = $component_id;
        }
        
        //this method requires that all Objects that correspond to a table
        //  must have the same name! table is all in lowercase
        protected function setAttributes($attributes) {
            //get the table name from the Class name
            $table_name = strtolower(get_class($this));
            
            //make the attributes a comma separated list
            $attributes_list = implode (", ", $attributes);
            
            try {
                if($this->checkForId()) {
                    //set all the attributes for a Program at once
                    $sql = "SELECT " . $attributes_list . " FROM " . $table_name .
                            " WHERE id=" . $this->id;
                    
                    //fetch the tuple and assign each attribute to the object
                    $stmt = $this->db->prepare($sql);
                    $stmt->execute();
                    $attrs_from_db = $stmt->fetchAll(PDO::FETCH_ASSOC);
                    
                    if(count($attrs_from_db)) {
                        foreach($attrs_from_db as $attr_from_db) {
                            //assign each attribute to the corresponding value
                            //  retrieved from the database
                            foreach($attributes as $attribute) {
                                $this->$attribute = $attr_from_db[$attribute];
                            }
                            
                        } //end foreach
                    } //end if
                } //end if
            } catch (Exception $error) {
                echo $error;
            }
        } //end setAttributes()
        
        public function getId() {
            return $this->id;
        }
        
        //Make sure an Id has been set for an Object
        protected function checkForId() {
            if(!empty($this->id)) {
                $result = TRUE;
            } else {
                throw new Exception("Error: No ID assigned to object");
            }
            
            return $result;
        }
    }
?>