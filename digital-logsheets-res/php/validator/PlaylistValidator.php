<?php
/**
 * digital-logsheets: A web-based application for tracking the playback of audio segments on a community radio station.
 * Copyright (C) 2015  Mike Dean
 * Copyright (C) 2015-2017  Evan Vassallo
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

class PlaylistValidator {

    /**
     * @var Playlist
     */
    private $playlist;

    /**
     * @var Episode
     */
    private $episode;

    /**
     * PlaylistValidator constructor.
     * @param Episode $episode
     */
    public function __construct($episode) {
        $this->playlist = $episode->getPlaylist();
        $this->episode = $episode;
    }

    public function checkFinalSaveValidity() {
        $errorsContainer = new SavePlaylistErrors();

        $this->doesFirstSegmentAlignWithEpisodeStart($errorsContainer);

        return $errorsContainer;
    }

    /**
     * @param SavePlaylistErrors $errorsContainer
     */
    private function doesFirstSegmentAlignWithEpisodeStart($errorsContainer) {
        $episodeSegments = $this->episode->getSegments();
        $episodeStartTime = $this->episode->getStartTime();

        $firstSegmentAlignWithEpisodeStart = false;

        foreach ($episodeSegments as $segment) {
            $segmentStartTime = $segment->getStartTime();

            if ($segmentStartTime == $episodeStartTime) {
                $firstSegmentAlignWithEpisodeStart = true;
                break;
            }
        }

        if (!$firstSegmentAlignWithEpisodeStart) {
            $errorsContainer->markNoAlignmentWithEpisodeStart();
        }
    }

}