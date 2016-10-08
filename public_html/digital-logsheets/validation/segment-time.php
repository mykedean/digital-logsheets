<?php
/**
 * digital-logsheets: A web-based application for tracking the playback of audio segments on a community radio station.
 * Copyright (C) 2015  Mike Dean
 * Copyright (C) 2015-2016  Evan Vassallo
 * Copyright (C) 2016  James Wang
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

require_once("../../../digital-logsheets-res/php/database/connectToDatabase.php");
require_once("../../../digital-logsheets-res/php/objects/Episode.php");
require("../../../digital-logsheets-res/php/validator/TimeValidator.php");
session_start();

const MINUTES_IN_DAY = 24 * 60;
$dbConn = connectToDatabase();

$episodeId = $_SESSION["episodeId"];
$episode = new Episode($dbConn, $episodeId);

$segmentTime = $_GET['segment_time'];

$timeValidator = new TimeValidator();
$isSegmentStartTimeInEpisode = $timeValidator::isSegmentWithinEpisodeBounds($segmentTime, $episode);

if ($isSegmentStartTimeInEpisode) {
    http_response_code(200);

} else {
    http_response_code(400);
}