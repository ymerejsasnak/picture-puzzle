"use strict";

$(function() {

    var PIC_SIZE = 600;
    var CELL_SIZE = PIC_SIZE / difficulty;

    //difficulty levels
    var LEVEL = {'VERY_EASY': 3,
                  'EASY': 4,
                  'NORMAL': 5,
                  'HARD': 6,
                  'VERY_HARD': 8,
                  'SUPER_HARD': 10}

    var difficulty = LEVEL['EASY'];
    var pictureDiv = $('#picture');
    var grid;
    var image = "photo.JPG"; //default image
    
    

    function slicePicture(img) {
        var cell;
        for(var row = 0; row < difficulty; row++) {
            for (var col = 0; col < difficulty; col++) {
                cell = $('<div id="' + (col + difficulty * row) + '" class="cell"></div>')
                cell.css({'background': 'url("' + img + '")', 
                          'background-size': PIC_SIZE + 'px ' + PIC_SIZE + 'px',
                          'background-position': (-PIC_SIZE / difficulty * col) + 'px ' + (-PIC_SIZE / difficulty * row) + 'px'});
                cell.width(PIC_SIZE / difficulty);
                cell.height(PIC_SIZE / difficulty);
                pictureDiv.append(cell);
            }
        }
    }

    function initGrid() {
        var grid = [];
        for (var i = 0; i < difficulty * difficulty; i++) {
            grid.push(Math.floor(Math.random() * 4) * 90);
        }
        return grid;
    }

    //use grid degree values to rotate all cells at start
    function rotateCells() {
        for (var id = 0; id < difficulty * difficulty; id++) {
            $('#' + id).css('transform', 'rotate(' + grid[id] + 'deg)');
        }
    }

    //rotate when clicked
    $('#picture').on('click', '.cell', function() {
        var id = $(this).attr('id');
        grid[id] = (grid[id] + 90) % 360;
        $('#' + id).css('transform', 'rotate(' + grid[id] + 'deg)');
        checkWin();
    });

    //reset game when changing difficulty
    $('#difficulty').on('change', function() {
        difficulty = LEVEL[$(this).val()];
        initGame();
    });

    //load image from url when button clicked and reset game
    $('#btn').on('click', function() {
        image = $('#imagename').val();
        initGame();       
    });

    function initGame(){
        $('.cell').remove();
        grid = initGrid();
        slicePicture(image);
        rotateCells();
    }
   
    function checkWin() {
        var won = true;
        for (var id = 0; id < difficulty * difficulty; id++) {
            if (grid[id] !== 0) {
                won = false;
            }
        }
        if (won === true) {
            alert('YOU DID IT!'); //temp crap
        }
    }
   

    initGame();

});