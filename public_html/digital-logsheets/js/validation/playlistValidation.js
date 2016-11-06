/*
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

function fetchSegmentsData() {
    var addedSegmentsTable = $('#added_segments').children('tbody');
    var segmentRows = addedSegmentsTable.children();

    var segmentData = [];

    segmentRows.each(function (i) {
        segmentData[i] = $(this).data("segment");
    });

    return segmentData;
}


function verifyPlaylistEpisodeAlignment() {
    var segments = fetchSegmentsData();
    var episodeStartTime = getEpisodeStartTime();
    var segmentTimeAlignWithEpisodeStart = false;

    segments.forEach(function (segment) {
        var segmentStartTime = segment.startTime;

        if (segmentStartTime == episodeStartTime) {
            segmentTimeAlignWithEpisodeStart = true;
            return false;
        }
    });


    if (segmentTimeAlignWithEpisodeStart) {
        markFirstSegmentAtEpisodeStart();
        return true;

    } else {
        markFirstSegmentNotAtEpisodeStart();
        return false;
    }
}