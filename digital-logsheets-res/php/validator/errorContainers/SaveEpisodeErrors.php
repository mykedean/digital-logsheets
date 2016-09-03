<?php

require('ErrorsContainer.php');

class SaveEpisodeErrors extends ErrorsContainer {

    public function __constructor() {
        $this->errors = [
            'tooLong' => false,
            'airDateTooFarInPast' => false,
            'airDateTooFarInFuture' => false,
            'prerecordDateInFuture' => false,
            'prerecordDateTooFarInPast' => false
        ];
    }

    public function markTooLong() {
        $this->errors['tooLong'] = true;
    }

}