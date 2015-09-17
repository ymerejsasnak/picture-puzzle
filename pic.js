"use strict";

$(function() {

    var PIC_SIZE = 600;
    var DIFFICULTY = 4;
    var CELL_SIZE = PIC_SIZE / DIFFICULTY;

   
    var pictureDiv = $('#picture');
    var grid = initGrid();
    
    

    function slicePicture() {
        var cell;
        for(var row = 0; row < DIFFICULTY; row++) {
            for (var col = 0; col < DIFFICULTY; col++) {
                cell = $('<div id="' + (col + DIFFICULTY * row) + '" class="cell"></div>')
                cell.css({'background': 'url("photo.JPG")', 
                          'background-size': PIC_SIZE + 'px ' + PIC_SIZE + 'px',
                          'background-position': (-PIC_SIZE / DIFFICULTY * col) + 'px ' + (-PIC_SIZE / DIFFICULTY * row) + 'px'});
                cell.width(PIC_SIZE / DIFFICULTY);
                cell.height(PIC_SIZE / DIFFICULTY);
                pictureDiv.append(cell);
            }
        }
    }

    function initGrid() {
        var grid = [];
        for (var i = 0; i < DIFFICULTY * DIFFICULTY; i++) {
            grid.push(Math.floor(Math.random() * 4) * 90);
        }
        return grid;
    }

    //use grid degree values to rotate all cells at start
    function rotateCells() {
        for (var id = 0; id < DIFFICULTY * DIFFICULTY; id++) {
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
   
    function checkWin() {
        var won = true;
        for (var id = 0; id < DIFFICULTY * DIFFICULTY; id++) {
            if (grid[id] !== 0) {
                won = false;
            }
        }
        if (won === true) {
            alert('won');
        }
    }
   

    slicePicture();
    rotateCells();

    console.log(grid)
    



    

});