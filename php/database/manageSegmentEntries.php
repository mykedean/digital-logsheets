<?php

    include_once("readFromDatabase.php");
    class manageSegmentEntries {

        private static $tableName = "segment";

        private static $idColumnName = "id";
        private static $segmentNameColumnName = "name";
        private static $albumColumnName = "album";
        private static $authorColumnName = "author";

        private static function getSegmentAttributeFromDatabase($db_connection, $attribute_column_name, $segment_id) {
            return readFromDatabase::readFirstMatchingEntryFromTable($db_connection, array($attribute_column_name),
                self::$tableName, array(self::$idColumnName), array($segment_id));
        }

        public static function getSegmentAttributesFromDatabase($db_connection, $segment_id, $segment_object) {
            $database_result = readFromDatabase::readFilteredColumnFromTable($db_connection, array(self::$segmentNameColumnName,
                self::$albumColumnName, self::$authorColumnName), self::$tableName, array(self::$idColumnName), array($segment_id));

            $segment_object->setName($database_result[0][self::$segmentNameColumnName]);
            $segment_object->setAlbum($database_result[0][self::$albumColumnName]);
            $segment_object->setAuthor($database_result[0][self::$authorColumnName]);
        }

        public static function getSegmentNameFromDatabase($db_connection, $segment_id) {
            return self::getSegmentAttributeFromDatabase($db_connection, self::$segmentNameColumnName, $segment_id);
        }

        public static function getSegmentAlbumFromDatabase($db_connection, $segment_id) {
            return self::getSegmentAttributeFromDatabase($db_connection, self::$albumColumnName, $segment_id);
        }

        public static function getSegmentAuthorFromDatabase($db_connection, $segment_id) {
            return self::getSegmentAttributeFromDatabase($db_connection, self::$authorColumnName, $segment_id);
        }

    }