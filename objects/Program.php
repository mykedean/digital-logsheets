<?php
    class Program extends LogsheetComponent{
        protected $name, $genres, $active;
        
        public function __construct($db) {
            parent::__construct($db);
        }
        
        public function setId($program_id) {
            parent::setId($program_id);
            
            //set all the attributes for the object as soon as the id has been set
            $this->setAttributes(array("name"));
        }
        
        public function getName() {
            return $this->name;
        }
    }
?>