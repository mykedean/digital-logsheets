<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/html">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>New Logsheet</title>

    <!-- Bootstrap core CSS -->
    <link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css" rel="stylesheet">
    <!-- Bootstrap theme -->
    <link href="http://getbootstrap.com/dist/css/bootstrap-theme.min.css" rel="stylesheet">
    <link href="css/custom.css" rel="stylesheet">

    <!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
    <!--[if lt IE 9]>
    <script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
    <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
    <![endif]-->

    <!-- jQuery -->
    <script src="https://code.jquery.com/jquery-1.11.3.min.js"></script>

    <!-- Boostrap JS -->
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js" integrity="sha384-0mSbJDEHialfmuBBQP6A4Qrprq5OVfW37PRR3j5ELqxss1yVqOtnepnHVP9aJ7xS" crossorigin="anonymous"></script>


    <script src="js/segment-validation.js"></script>
    <script src="js/manage-segments.js"></script>
    <script src="js/category_button.js"></script>

</head>
<body>

<div class="container-fluid">
    <h1>Review Submission</h1>

    Show Name: {$episode.program} <br/>
    Programmer(s): <br/>
    Day and Date: {$episode.start_date} <br/>
    Time Started: {$episode.start_time}  Time Ended: {$episode.end_time} <br/>
    Pre-recorded? {$episode.prerecorded}  Date? {$episode.prerecord_date} <br/> <br/>

    <table class="table">
        <tr>
            <th>Time</th>
            <th>Duration</th>
            <th colspan="3">Description of music (artist, album, song); spoken word, or ads/promotion</th>
            <th>Category</th>
            <th>CC</th>
            <th>NR</th>
            <th>FR</th>
        </tr>

        {foreach $segments as $segment}
            <tr>
                <td>{$segment.start_time}</td>
                <td>{$segment.duration}</td>

                {if {$segment.category} == 2 || {$segment.category} == 3}}
                    <td>{$segment.name}</td>
                    <td>{$segment.album}</td>
                    <td>{$segment.artist}</td>
                {elseif {$segment.category} == 5}
                    <td colspan="3">{$segment.ad_number}</td>
                {else}
                    <td colspan="3">{$segment.name}</td>
                {/if}

                <td>{$segment.category}</td>
                <td>{$segment.can_con}</td>
                <td>{$segment.new_release}</td>
                <td>{$segment.french_vocal_music}</td>
            </tr>
        {/foreach}
    </table>

</div>


</body>