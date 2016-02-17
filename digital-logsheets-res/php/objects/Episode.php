<?php

    //TODO: Error checking...
    require_once(__DIR__ . "/../database/manageEpisodeEntries.php");
    require_once(__DIR__ . "/LogsheetComponent.php");

    class Episode extends LogsheetComponent {

        private $program;
        private $playlist;
        private $programmer;

        private $episode_start_time;
        private $episode_end_time;

        private $is_prerecord;
        private $prerecord_date;

        public function __construct($db, $component_id) {
            parent::__construct($db, $component_id);

            if ($component_id != null) {
                manageEpisodeEntries::getEpisodeAttributesFromDatabase($db, $component_id, $this);
            }
        }

        public function setProgram($program) {
            $this->program = $program;
        }

        public function setPlaylist($playlist) {
            $this->playlist = $playlist;
        }

        public function setProgrammer($programmer) {
            $this->programmer = $programmer;
        }

        public function setStartTime($start_time) {
            $this->episode_start_time = $start_time;
        }

        public function setEndTime($end_time) {
            $this->episode_end_time = $end_time;
        }

        public function setIsPrerecord($is_prerecord) {
            $this->is_prerecord = $is_prerecord;

            if (!$is_prerecord) {
                $this->prerecord_date = null;
            }
        }

        public function setPrerecordDate($prerecord_date) {
            $this->prerecord_date = $prerecord_date;
        }

        /**
         * @return Programmer
         */
        public function getProgrammer() {
            return $this->programmer;
        }

        /**
         * @return Program
         */
        public function getProgram() {
            return $this->program;
        }

        public function getProgramName() {
            try {
                if($this->checkForId()) {
                    return $this->program->getName();
                }
            } catch (Exception $error) {
                echo $error;
            }
        }
        
        //returns an array of segment objects
        public function getSegments() {
            return $this->playlist->getSegments();
        }

        public function getPlaylistId() {
            error_log("getting playlist id:" . $this->playlist->getId());
            return $this->playlist->getId();
        }

        /**
         * @return Playlist
         */
        public function getPlaylist() {
            return $this->playlist;
        }
        
        public function getStartDate() {
            return $this->getStartTime();
        }
        
        public function getStartTime() {
            try {
                if($this->checkForId()) {
                    return $this->episode_start_time;
                }
            } catch (Exception $error) {
                echo $error;
            }
        }
        
        public function getEndTime() {
            try {
                if($this->checkForId()) {
                    return $this->episode_end_time;
                }
            } catch (Exception $error) {
                echo $error;
            }
        }

        public function isPrerecord() {
            return $this->is_prerecord;
        }

        public function getPrerecordDate() {
            return $this->prerecord_date;
        }
    }
?>