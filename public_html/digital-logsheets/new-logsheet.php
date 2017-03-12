<?php
    //----INCLUDE FILES----
    include("../../digital-logsheets-res/smarty/libs/Smarty.class.php");
    include_once("../../digital-logsheets-res/php/database/connectToDatabase.php");
    include_once("../../digital-logsheets-res/php/database/manageCategoryEntries.php");
    require_once("../../digital-logsheets-res/php/objects/logsheetClasses.php");
    require_once("../../digital-logsheets-res/php/select2-preparation.php");
	include 'connect_to_mysql.php';
    
	$program = -1;
	if (isset($_GET["program"])){
		$program = $_GET["program"];
	} else {
		
	}
	
    // create object
    $smarty = new Smarty;
    
    //database interactions
    try {
        //connect to database
        $db = connectToDatabase();
        
        $categories = manageCategoryEntries::getAllCategoriesFromDatabase($db);
        $programs = getSelect2ProgramsList($db);
        
        //close database connection
        $db = NULL;
        
        $smarty->assign("programs", $programs);
        $smarty->assign("categories", $categories);

        // display it
        echo $smarty->fetch('../../digital-logsheets-res/templates/new-logsheet.tpl');
		
    } catch(PDOException $e) {
        echo 'ERROR: ' . $e->getMessage();
    }
?>