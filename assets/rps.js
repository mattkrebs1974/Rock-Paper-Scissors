$(document).ready(function () {
    var pos=2;
    var posi=2;

   

function setInMotion(){
    
 var startedMotion=setInterval(frame, 100);
    //1000 means seconds. 

    function frame() {
        if (pos == 0) {
            $("#outcomeOne").attr("src", "./Rock.png");
            // $("#outcomeTwo").attr("src", "./Paper.png");
            pos = 3;
            pos--;
           
        }
        else if (pos == 1) {
            
            $("#outcomeOne").attr("src", "./Paper.png");
            // $("#outcomeTwo").attr("src", "./Scissors.png");
            pos--; }
             
        else if (pos == 2) {

            $("#outcomeOne").attr("src", "./Scissors.png");
            // $("#outcomeTwo").attr("src", "./Rock.png");
            pos--;

        } else {};

    }

    frame();  

    }
    
   setInMotion();


    function setInMotion2() {

        var startedMotion2 = setInterval(frame2, 100);
        //1000 means seconds. 

        function frame2() {
            if (posi == 0) {
               
              
                posi = 3;
                posi--;

            }
            else if (posi == 1) {

              
                $("#outcomeTwo").attr("src", "./Scissors.png");
                posi--;
            }

            else if (posi == 2) {

              
                $("#outcomeTwo").attr("src", "./Rock.png");
                posi--;

            } else { };

        }

        frame2();

    }

    setInMotion2();



//stop --- pos=5;
//start --- pos=2;

pos=5;
posi=5;


   

var firebaseConfig = {
    apiKey: "AIzaSyAZBPmZcitrg8Dw8DMUkwuqB1JRcbJj-6I",
    authDomain: "rockpaperscissors-b19ba.firebaseapp.com",
    databaseURL: "https://rockpaperscissors-b19ba.firebaseio.com",
    projectId: "rockpaperscissors-b19ba",
    storageBucket: "rockpaperscissors-b19ba.appspot.com",
    messagingSenderId: "328081556370",
    appId: "1:328081556370:web:9b37d15c7e23d0442bb74b",
    measurementId: "G-0TSHR755EF"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

    var database = firebase.database();

    var player1 = null;
    var player2 = null;
    var yourPlayerName = "";
    var player1Choice = "";
    var player2Choice = "";
    var turn = 1;

    database.ref("/players/").on("value",function(snapshot) {
        if (snapshot.child("player1").exists()) {
            console.log("Player 1 exists");

            player1 = snapshot.val().player1;
            player1Name = player1.name;

            $("#nameone").text(player1Name);

            $("#totalWinsOne").html("Session Wins: " + player1.win);

        } else {
            console.log("Player 1 does NOT exist");

            player1 = null;
            player1Name = "";

            $("#nameone").text("Player 1");
            database.ref("/outcome/").remove();
        }

        if (snapshot.child("player2").exists()) {
            console.log("Player 2 exists");

            player2 = snapshot.val().player2;
            player2Name = player2.name;

            $("#nametwo").text(player2Name);

            $("#totalWinsTwo").html("Session Wins: " + player2.win);
        
        } else {
            console.log("Player 2 does NOT exist");

            player2 = null;
            player2Name = "";


            $("#nametwo").text("Player 2");
            database.ref("/outcome/").remove();
        }

        if (!player1 && !player2) {
            database.ref("/chat/").remove();
            database.ref("/turn/").remove();
            database.ref("/outcome/").remove();

            $("#chat-box").empty();
            $("#totalWinsOne").html("Session Wins: ");
            $("#totalWinsTwo").html("Session Wins: ");
        }
    });

    $("#register").on("click", function (event) {
        event.preventDefault();

        if (($("#username").val().trim() !== "") && !(player1 && player2)) {

            if (player1 === null) {
                console.log("Adding Player 1");
                yourPlayerName = $("#username").val().trim();
                player1 = {
                    name: yourPlayerName,
                    win: 0,
                    loss: 0,
                    tie: 0,
                    choice: ""
                };
                $("#nameone").text(player1.name);
                pos=2;
                console.log("posi" + posi);
               
                // $("#player-1-greeting").css("display", "block");
                // $("#player-1-buttons").css("display", "block");
                // $("#enter-name").css("display", "none");
               
                console.log(player1);
                console.log(yourPlayerName);
                database.ref().child("/players/player1").set(player1);

                database.ref().child("/turn").set(1);

                database.ref("/players/player1").onDisconnect().remove();
            } else if ((player1 !== null) && (player2 === null)) {
                console.log("Adding Player 2");

                yourPlayerName = $("#username").val().trim();
                player2 = {
                    name: yourPlayerName,
                    win: 0,
                    loss: 0,
                    tie: 0,
                    choice: ""
                };
                $("#nametwo").text(player2.name);
                pos=2;
                posi=2;
                console.log("posi"+posi);

                // $("#player-2-greeting").css("display", "block");
                // $("#player-2-buttons").css("display", "block");
                // $("#enter-name").css("display", "none");

                database.ref().child("/players/player2").set(player2);

                database.ref("/players/player2").onDisconnect().remove();
            }


            var msg = yourPlayerName + " has joined!";
            console.log(msg);

            var chatKey = database.ref().child("/chat/").push().key;

            database.ref("/chat/" + chatKey).set(msg);

            $("#username").val("");

        }

    });

    database.ref("/turn/").on("value", function (snapshot) {
        if (snapshot.val() === 1) {
            console.log("TURN 1");
            turn = 1;

            if (player1 && player2) {

                // $("#player-2-div").css("border-color", "black");
                // $("#player-1-div").css("border-color", "red");
                pos = 2;

                $("#isToolSelectedOne").html("Select Your Tool!");

                

            }
            if (snapshot.child("/outcome/").exists()) {
                console.log("player 1 tool selected")
            }

        } else if (snapshot.val() === 2) {
            console.log("TURN 2");
            turn = 2;

            if (player1 && player2) {
                $("#player-1-div").css("border-color", "black");
                $("#player-2-div").css("border-color", "red");
                $("#make-choice").html("<h4>" + player2Name + ", make your choice!</h4>");
            }
            if (snapshot.child("/outcome/").exists()) {
                $("chat-box").append("<h4>" + outcome + "!</h4>");
            }
        }
    });
    database.ref("/chat/").on("child_added", function (snapshot) {
        var chatMsg = snapshot.val();
        var chatEntry = $("<div>").html(chatMsg);

        $("#chat-box").append(chatEntry);
        $("#chat-box").scrollTop($("#chat-box")[0].scrollHeight);
    });


    $("#chat-send").on("click", function (event) {
        event.preventDefault();

        if ((yourPlayerName !== "") && ($("#player-chat").val().trim() !== "")) {
            var msg = yourPlayerName + ": " + $("#player-chat").val().trim();
            $("#player-chat").val("");

            var chatKey = database.ref().child("/chat/").push().key;

            database.ref("/chat/" + chatKey).set(msg);
        }
    });


    database.ref("/outcome/").on("value", function (snapshot) {
        var outcome = snapshot.val();

        console.log("outcome has changed");

        // $("#round-outcome").html(snapshot.val());

    });


    $("#tools").on("click", ".btnOne", function (event) {
        event.preventDefault();

        if (player1 && player2 && (yourPlayerName === player1.name) && (turn === 1)) {
            var choice = $(this).val().trim();

            player1.choice = choice;
            database.ref().child("/players/player1/choice").set(choice);

            turn = 2;
            database.ref().child("/turn").set(2);
            $("#round-outcome").html("");

        }
    });


    $("#tools").on("click", ".btnTwo", function (event) {
        event.preventDefault();

        if (player1 && player2 && (yourPlayerName === player2.name) && (turn === 2)) {
            var choice = $(this).val().trim();

            player2.choice = choice;
            database.ref().child("/players/player2/choice").set(choice);

            rpsCompare();

        }
    });

    function rpsCompare() {
        if (player1.choice === "rock") {
            if (player2.choice === "rock") {
                console.log("tie");

                database.ref().child("/outcome/").set("Tie game!");
                database.ref().child("/players/player1/tie").set(player1.tie + 1);
                database.ref().child("/players/player2/tie").set(player2.tie + 1);

                pos=5;
                posi=5;
                $("#outcomeOne").attr("src", "./Rock.png");
                $("#outcomeTwo").attr("src", "./Rock.png");
                

            } else if (player2.choice === "paper") {
                console.log("paper wins");

                database.ref().child("/outcome/").set(player2.name + " wins! <br> Paper beats Rock!");
                database.ref().child("/players/player1/loss").set(player1.loss + 1);
                database.ref().child("/players/player2/win").set(player2.win + 1);

                pos = 5;
                posi = 5;
                $("#outcomeOne").attr("src", "./Rock.png");
                $("#outcomeTwo").attr("src", "./Paper.png");


            } else {
                console.log("rock wins");

                database.ref().child("/outcome/").set(player1.name + " wins! <br> Rock beats Scissors!");
                database.ref().child("/players/player1/win").set(player1.win + 1);
                database.ref().child("/players/player2/loss").set(player2.loss + 1);

                pos = 5;
                posi = 5;
                $("#outcomeOne").attr("src", "./Rock.png");
                $("#outcomeTwo").attr("src", "./Scissors.png");

            }

        } else if (player1.choice === "paper") {
            if (player2.choice === "rock") {
                console.log("paper wins");

                database.ref().child("/outcome/").set(player1.name + " wins! <br> Paper beats Rock!");
                database.ref().child("/players/player1/win").set(player1.win + 1);
                database.ref().child("/players/player2/loss").set(player2.loss + 1);

                pos = 5;
                posi = 5;
                $("#outcomeOne").attr("src", "./Paper.png");
                $("#outcomeTwo").attr("src", "./Rock.png");


            } else if (player2.choice === "paper") {
                console.log("tie");

                database.ref().child("/outcome/").set("Tie game!");
                database.ref().child("/players/player1/tie").set(player1.tie + 1);
                database.ref().child("/players/player2/tie").set(player2.tie + 1);

                pos = 5;
                posi = 5;
                $("#outcomeOne").attr("src", "./Paper.png");
                $("#outcomeTwo").attr("src", "./Paper.png");



            } else {
                console.log("scissors win");

                database.ref().child("/outcome/").set(player2.name + " wins! <br> Scissors beats Paper!");
                database.ref().child("/players/player1/loss").set(player1.loss + 1);
                database.ref().child("/players/player2/win").set(player2.win + 1);

                pos = 5;
                posi = 5;
                $("#outcomeOne").attr("src", "./Paper.png");
                $("#outcomeTwo").attr("src", "./Scissors.png");


            }

        } else if (player1.choice === "scissors") {
            if (player2.choice === "rock") {
                console.log("rock wins");

                database.ref().child("/outcome/").set(player2.name + " wins! <br> Rock beats Scissors!");
                database.ref().child("/players/player1/loss").set(player1.loss + 1);
                database.ref().child("/players/player2/win").set(player2.win + 1);

                pos = 5;
                posi = 5;
                $("#outcomeOne").attr("src", "./Scissors.png");
                $("#outcomeTwo").attr("src", "./Rock.png");



            } else if (player2.choice === "paper") {
                console.log("scissors win");

                database.ref().child("/outcome/").set(player1.name + " wins! <br> Scissors beats Paper!");
                database.ref().child("/players/player1/win").set(player1.win + 1);
                database.ref().child("/players/player2/loss").set(player2.loss + 1);
                pos = 5;
                posi = 5;
                $("#outcomeOne").attr("src", "./Scissors.png");
                $("#outcomeTwo").attr("src", "./Paper.png");


            } else {
                console.log("tie");

                database.ref().child("/outcome/").set("Tie game!");
                database.ref().child("/players/player1/tie").set(player1.tie + 1);
                database.ref().child("/players/player2/tie").set(player2.tie + 1);


                pos = 5;
                posi = 5;
                $("#outcomeOne").attr("src", "./Scissors.png");
                $("#outcomeTwo").attr("src", "./Scissors.png");
            }
        }

        turn = 1;
        database.ref().child("/turn").set(1);
        // database.ref("/outcome/").on("value", function(snapshot) {
        //     $("#round-outcome").html(snapshot.val());
        // });
    }









});