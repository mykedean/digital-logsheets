$(document).ready(function () {
    $('#logsheet').on('submit', function(e) {
        e.preventDefault();
        addSegment();
    });
});

function getEpisodeSegments() {
    $.ajax({
        type: "POST",
        url: window.location.protocol + "//" + window.location.host + "/" + "digital-logsheets/get-episode-data.php",
        data: $('#logsheet').serialize(),
        success: successCallback,
        error: errorCallback
    });

    console.log(window.location.protocol + "//" + window.location.host + "/" + "digital-logsheets/get-episode-data.php");
}


function addSegment() {
    var dataToSend = $('#logsheet').serializeArray();

    sendRequestToSaveSegment(dataToSend);
}

function editEpisodeSegment(id) {
    var dataToSend = $('#logsheet').serializeArray();
    dataToSend.push({name: "segment_id", value: id});
    dataToSend.push({name: "is_existing_segment", value: true});

    sendRequestToSaveSegment(dataToSend);

    // change submit value to addSegment
}

function prepareFormForEdit(eventObject) {
    var segment_object = eventObject.currentTarget.data("segment");

    //set values of logsheet form

    switch (segment_object.category) {
        case 1:
            $('.category1').prop('checked', true);
            break;
        case 2:
            $('.category2').prop('checked', true);
            break;
        case 3:
            $('.category3').prop('checked', true);
            break;
        case 4:
            $('.category4').prop('checked', true);
            break;
        case 5:
            $('.category5').prop('checked', true);
            break;
    }

    $('#name_input').attr("value", segment_object.name);
    $('#author_input').attr("value", segment_object.author);
    $('#album_input').attr("value", segment_object.album);
    $('#ad_number_input').attr("value", segment_object.ad_number);

    //change submit value to editEpisodeSegment
}

function sendRequestToSaveSegment(dataToSend) {
    $.ajax({
        type: "POST",
        url: window.location.protocol + "//" + window.location.host + "/" + "digital-logsheets/save-segment.php",
        dataType: "json",
        data: dataToSend,
        success: successCallback,
        error: errorCallback
    });
}

function deleteEpisodeSegment(id) {
    console.log("in deleteEpisodeSegment");

    $.ajax({
        type: "POST",
        url: window.location.protocol + "//" + window.location.host + "/" + "digital-logsheets/delete-segment.php",
        data: { segment_id : id },
        success: deleteSuccessCallback,
        error: deleteErrorCallback
    })
}



function errorCallback(jqhxr, textStatus, errorThrown) {
    alert("add segment fail! status: " + textStatus + " error thrown: " + errorThrown);
}


function successCallback(data) {
    console.log("success callback");

    if (!data.hasOwnProperty("error")) {
        $('#logsheet').trigger("reset");
        $('.category').button('reset');

        console.log(data[0]);

        var addedSegments = $('#added_segments');
        addedSegments.empty();
        addedSegments.append($('<thead><tr>' + '<th>' + 'Time' + '</th>' +'<th>' + 'Name' + '</th>' + '</tr></thead><tbody>'));

        $.each(data, function(i, e) {
            var segment_id = data[i].id;
            var name = data[i].name;
            var start_time = data[i].start_time;

            var delete_button = generateDeleteButton(segment_id);
            var edit_button = generateEditButton(segment_id);

            var segmentRow = $(document.createElement("tr"))
                .data("segment", data[i])
                .append($('<td class="vert-align">' + start_time + '</td>')).append($('<td class="vert-align">' + name + '</td>')).append($('<td class="vert-align">')
                .append($('<div class="dropdown">')
                    .append($('<button class="btn btn-default btn-xs dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">')
                        .append($('<span class="glyphicon glyphicon-option-vertical" aria-hidden="true">')))
                    .append($('<ul class="dropdown-menu" aria-labelledby="dropdownMenu1">')
                        .append(edit_button).append(delete_button))));

            addedSegments.append(segmentRow);
            console.log("segment saved in row:");
            console.log(segmentRow.data("segment"));

        });

        addedSegments.append($('</tbody>'));

    } else {
        console.log("error in data " + data.error);
        //TODO error handling
    }
}

function generateDeleteButton(segment_id) {
    return $(document.createElement("li"))
        .click(function(eventObject) {
            console.log("entered delete button on click handler");
            deleteEpisodeSegment(segment_id);
        })
        .text("Delete");
}

function generateEditButton(segment_id) {
    return $(document.createElement("li"))
        .click(function(eventObject) {
            console.log("entered edit button on click handler");
            prepareFormForEdit(eventObject);
        })
        .text("Edit");
}



function deleteSuccessCallback(data) {
    console.log("success callback");

    if (!data.hasOwnProperty("error")) {
        getEpisodeSegments();
    } else {
        console.log("error in data " + data.error);
        //TODO error handling
    }
}

function deleteErrorCallback(jqhxr, textStatus, errorThrown) {
    alert("add segment fail! status: " + textStatus + " error thrown: " + errorThrown);
}