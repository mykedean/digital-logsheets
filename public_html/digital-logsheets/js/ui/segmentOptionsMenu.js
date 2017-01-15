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

function generateDeleteButton(segment_id) {
    return $(document.createElement("li"))
        .click(function(eventObject) {
            deleteEpisodeSegment(segment_id);
        })
        .append('<a href="#">Delete</a>');
}

function generateEditButton(segment_id) {
    return $(document.createElement("li"))
        .click(function(eventObject) {
            prepareFormForEdit(eventObject);
        })
        .append('<a href="#">Edit</a>');
}