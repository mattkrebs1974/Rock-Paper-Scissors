$(document).ready(function () {
    var pos=2;

   

function setInMotion(){
    
 var startedMotion=setInterval(frame, 100);
    //1000 means seconds. 

    function frame() {
        if (pos == 0) {
            $("#outcomeOne").attr("src", "./Rock.png");
            $("#outcomeTwo").attr("src", "./Paper.png");
            pos = 3;
            pos--;
           
        }
        else if (pos == 1) {
            
            $("#outcomeOne").attr("src", "./Paper.png");
            $("#outcomeTwo").attr("src", "./Scissors.png");
            pos--; }
             
        else if (pos == 2) {

            $("#outcomeOne").attr("src", "./Scissors.png");
            $("#outcomeTwo").attr("src", "./Rock.png");
            pos--;

        } else {};

    }

    frame();  

    }
    
   setInMotion();
//stop --- pos=5;
//start --- pos=2;


    });