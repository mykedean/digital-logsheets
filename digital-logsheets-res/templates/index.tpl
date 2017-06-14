<!DOCTYPE html>
<html>
<head>
    <title>
        Logsheets Retrieval
    </title>
    {include './header.tpl'}
    {include './datetime-picker.tpl'}
    {include './select2.tpl'}


    <script src="js/filterLogsheetList.js"></script>
    <script type="text/javascript">

        function init() {
            var data = {$programs};
            var $programSelect = $(".program");

            $programSelect.select2({
                data: data
            });

            $programSelect.on("change", function (e) {
                updateFilteredLogsheetList();
            } );
        }

        function updateFilteredLogsheetList() {
            var programNameFilterList = $(".program").select2('data').map(function (index, element) {
                console.log(index.text);
                return index.text;
            });

            var startDateFilter = $( "#startDateFilter" ).val();
            var endDateFilter = $( "#endDateFilter" ).val();

            var episodes = {$episodes|json_encode};

            filterLogsheetList(episodes, programNameFilterList, startDateFilter, endDateFilter);
        }

    </script>
</head>
<body onload="init()">
<div class='container-fluid'>
    {if $program_id != null}

        <div class="row">
            <div class="col-sm-2">
                <a href="new-logsheet.php?program_id={$program_id}">New Logsheet</a>
            </div>
        </div>

    {else}
        <div class="row">
            <div class="col-sm-2">
                <a href="new-logsheet.php">New Logsheet</a>
            </div>
        </div>

    {/if}

    <div class="form-group">
        <div class="col-sm-2 col-sm-offset-2">
        </div>
    </div>

    <br/>
    <br/>
    <div class="row">
        <div class="form-group">
            {if $program_id != null}
                <div class="col-sm-4 " style="display: none">
                    <label for="program" class="control-label">Program:</label>
                    <select class="form-control program" name="program" id="program" multiple="multiple"></select>
                </div>
            {/if}
            {if $program_id == null}
                <div class="col-sm-4">
                    <label for="program" class="control-label">Program:</label>
                    <select class="form-control program" name="program" id="program" multiple="multiple"></select>
                </div>
            {/if}

            <div class="col-sm-4">
                <label for="startDateFilter" class="control-label">Start:</label>
                <input type="date" id="startDateFilter" onchange="updateFilteredLogsheetList()">
            </div>
            <div class="col-sm-4">
                <label for="endDateFilter" class="control-label">End:</label>
                <input type="date" id="endDateFilter" onchange="updateFilteredLogsheetList()">
            </div>
        </div>
    </div>

    <div class="logsheets">
        <br/>
        {foreach $episodes as $episode}
            <a href="view-episode-logsheet.php?episode_id={$episode.id}">{$episode.program} - {$episode.startDate}</a> <br />
        {/foreach}
    </div>
</div>

</body>
</html>
    