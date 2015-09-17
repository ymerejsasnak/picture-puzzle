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
            grid.push(0);
        }
        return grid;
    }

    //rotate when clicked
    $('#picture').on('click', '.cell', function() {
        var id = $(this).attr('id');
        grid[id] = (grid[id] + 90) % 360;
        $('#' + id).css('transform', 'rotate(' + grid[id] + 'deg)');
    });
   

   

    slicePicture();

    console.log(grid)
    



    

});