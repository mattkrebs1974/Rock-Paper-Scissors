$(document).ready(function () {
  var pos;

  const setInMotion = () => {
    if (pos == 0) {
      $("#outcomeOne").attr("src", "./Rock.png");
      $("#outcomeTwo").attr("src", "./Paper.png");
      pos = 3;
      pos--;
    } else if (pos == 1) {
      $("#outcomeOne").attr("src", "./Paper.png");
      $("#outcomeTwo").attr("src", "./Scissors.png");
      pos--;
    } else if (pos == 2) {
      $("#outcomeOne").attr("src", "./Scissors.png");
      $("#outcomeTwo").attr("src", "./Rock.png");
      pos--;
    } else {
    }
  };

  const postwo = () => {
    pos = 2;
  };

  const posfive = () => {
    pos = 5;
  };

  const firebaseConfig = {
    apiKey: "AIzaSyAZBPmZcitrg8Dw8DMUkwuqB1JRcbJj-6I",
    authDomain: "rockpaperscissors-b19ba.firebaseapp.com",
    databaseURL: "https://rockpaperscissors-b19ba.firebaseio.com",
    projectId: "rockpaperscissors-b19ba",
    storageBucket: "rockpaperscissors-b19ba.appspot.com",
    messagingSenderId: "328081556370",
    appId: "1:328081556370:web:9b37d15c7e23d0442bb74b",
    measurementId: "G-0TSHR755EF",
  };

  const rpsCompare = () => {
    if (player1.choice === "rock") {
      if (player2.choice === "rock") {
        console.log("tie");

        database.ref().child("/outcome/").set("Tie game!");
        $("#winOrLoseOne").html("Tie Game!");
        database
          .ref()
          .child("/players/player1/tie")
          .set(player1.tie + 1);
        database
          .ref()
          .child("/players/player2/tie")
          .set(player2.tie + 1);
        database
          .ref()
          .child("/players/player1/response")
          .set(player1.name + ", You earned a 'Tie'");
        database
          .ref()
          .child("/players/player2/response")
          .set(player2.name + ", You earned a 'Tie'");
      } else if (player2.choice === "paper") {
        console.log("paper wins");

        database
          .ref()
          .child("/outcome/")
          .set(player2.name + " wins! Paper beats Rock!");
        $("#winOrLoseOne").html(player2.name + " wins!  Paper beats Rock!");
        database
          .ref()
          .child("/players/player1/loss")
          .set(player1.loss + 1);
        database
          .ref()
          .child("/players/player2/win")
          .set(player2.win + 1);
        database
          .ref()
          .child("/players/player1/response")
          .set(player1.name + ", You lost!");
        database
          .ref()
          .child("/players/player2/response")
          .set(player2.name + ", You won!");
      } else {
        console.log("rock wins");

        database
          .ref()
          .child("/outcome/")
          .set(player1.name + " wins! Rock beats Scissors!");
        $("#winOrLoseOne").html(player1.name + " wins!  Rock beats Scissors!");
        database
          .ref()
          .child("/players/player1/win")
          .set(player1.win + 1);
        database
          .ref()
          .child("/players/player2/loss")
          .set(player2.loss + 1);
        database
          .ref()
          .child("/players/player1/response")
          .set(player1.name + ", You win!");
        database
          .ref()
          .child("/players/player2/response")
          .set(player2.name + ", You lost!");
      }
    } else if (player1.choice === "paper") {
      if (player2.choice === "rock") {
        console.log("paper wins");
        database
          .ref()
          .child("/outcome/")
          .set(player1.name + " wins! Paper beats Rock!");
        $("#winOrLoseOne").text(player1.name + " wins! Paper beats Rock!");
        database
          .ref()
          .child("/players/player1/win")
          .set(player1.win + 1);
        database
          .ref()
          .child("/players/player2/loss")
          .set(player2.loss + 1);
        database
          .ref()
          .child("/players/player1/response")
          .set(player1.name + ", You win!");
        database
          .ref()
          .child("/players/player2/response")
          .set(player2.name + ", You lost!");
      } else if (player2.choice === "paper") {
        console.log("tie");

        database.ref().child("/outcome/").set("Tie game!");
        $("#winOrLoseOne").html("Tie Game!");
        database
          .ref()
          .child("/players/player1/tie")
          .set(player1.tie + 1);
        database
          .ref()
          .child("/players/player2/tie")
          .set(player2.tie + 1);

        database
          .ref()
          .child("/players/player1/response")
          .set(player1.name + ", You earned a 'Tie'");
        database
          .ref()
          .child("/players/player2/response")
          .set(player2.name + ", You earned a 'Tie'");
      } else {
        console.log("scissors win");

        database
          .ref()
          .child("/outcome/")
          .set(player2.name + " wins! Scissors beats Paper!");
        $("#winOrLoseOne").html(player2.name + " wins! Scissors beats Paper!");
        database
          .ref()
          .child("/players/player1/loss")
          .set(player1.loss + 1);
        database
          .ref()
          .child("/players/player2/win")
          .set(player2.win + 1);
        database
          .ref()
          .child("/players/player1/response")
          .set(player1.name + ", You lost!");
        database
          .ref()
          .child("/players/player2/response")
          .set(player2.name + ", You won!");
      }
    } else if (player1.choice === "scissors") {
      if (player2.choice === "rock") {
        console.log("rock wins");

        database
          .ref()
          .child("/outcome/")
          .set(player2.name + " wins! Rock beats Scissors!");
        $("#winOrLoseOne").html(player2.name + " wins! Rock beats Scissors!");
        database
          .ref()
          .child("/players/player1/loss")
          .set(player1.loss + 1);
        database
          .ref()
          .child("/players/player2/win")
          .set(player2.win + 1);
        database
          .ref()
          .child("/players/player1/response")
          .set(player1.name + ", You lost!");
        database
          .ref()
          .child("/players/player2/response")
          .set(player2.name + ", You won!");
      } else if (player2.choice === "paper") {
        console.log("scissors win");

        database
          .ref()
          .child("/outcome/")
          .set(player1.name + " wins! Scissors beats Paper!");
        $("#winOrLoseOne").html(player1.name + " wins! Scissors beats Paper!");

        database
          .ref()
          .child("/players/player1/win")
          .set(player1.win + 1);
        database
          .ref()
          .child("/players/player2/loss")
          .set(player2.loss + 1);

        database
          .ref()
          .child("/players/player1/response")
          .set(player1.name + ", You win!");
        database
          .ref()
          .child("/players/player2/response")
          .set(player2.name + ", You lost!");
      } else {
        console.log("tie");

        database.ref().child("/outcome/").set("Tie game!");
        $("#winOrLoseOne").html("Tie Game!");
        database
          .ref()
          .child("/players/player1/tie")
          .set(player1.tie + 1);
        database
          .ref()
          .child("/players/player2/tie")
          .set(player2.tie + 1);

        database
          .ref()
          .child("/players/player1/response")
          .set(player1.name + ", You earned a 'Tie'");
        database
          .ref()
          .child("/players/player2/response")
          .set(player2.name + ", You earned a 'Tie'");
      }
    }

    setTimeout(function () {
      turn = 1;
    }, 3000);
    database.ref().child("/turn").set(1);

    database.ref("/outcome/").on("value", function (snapshot) {
      $("#winOrLoseOne").html(snapshot.val());
    });

    database.ref("/players/player1/response").on("value", function (snapshot) {
      $("#winOrLoseOne").html(snapshot.val());
    });
    switching();
  };

  const switching = () =>  {
    turn = 1;
    database.ref("/outcome/").on("value", function (snapshot) {
      console.log("player1-fire-base-data" + snapshot.val());

      $("#winOrLoseOne").html(snapshot.val());
    });
  }

  setTimeout(postwo, 0);
  setInMotion();
  firebase.initializeApp(firebaseConfig);
  var database = firebase.database();
  var player1 = null;
  var player2 = null;
  var yourPlayerName = "";
  var turn = 1;

  database.ref("/players/").on("value", function (snapshot) {
    if (snapshot.child("player1").exists()) {
      console.log("Player 1 exists");
      player1 = snapshot.val().player1;
      player1Name = player1.name;
      $("#nameone").text(player1Name);
      $("#totalWinsOne").html("Session Wins: " + player1.win);
      $("#lossesOne").html("Session Losses: " + player1.loss);
    } else {
      console.log("Player 1 does NOT exist");
      player1 = null;
      player1Name = "";
      $("#nameone").text("Player 1");
      database.ref("/outcome/").remove();
      database.ref("/turn/").remove();
      $("#chat-box").empty();
    }
    if (snapshot.child("player2").exists()) {
      console.log("Player 2 exists");
      player2 = snapshot.val().player2;
      player2Name = player2.name;
      $("#nametwo").text(player2Name);
      $("#totalWinsTwo").html("Session Wins: " + player2.win);
      $("#lossesTwo").html("Session Losses:  " + player2.loss);
    } else {
      console.log("Player 2 does NOT exist");
      player2 = null;
      player2Name = "";
      $("#nametwo").text("Player 2");
      database.ref("/outcome/").remove();
      database.ref("/turn/").remove();
      $("#chat-box").empty();
    }
    if (!player1 && !player2) {
      database.ref("/chat/").remove();
      database.ref("/turn/").remove();
      database.ref("/outcome/").remove();
      $("#chat-box").empty();
      $("#totalWinsOne").html("Session Wins: ");
      $("#lossesOne").html("Session Losses: ");
      $("#totalWinsTwo").html("Session Wins: ");
      $("#lossesTwo").html("Session Losses: ");
    }
  });

  $("#register").on("click", function (event) {
    event.preventDefault();
    if ($("#username").val().trim() !== "" && !(player1 && player2)) {
      if (player1 === null) {
        console.log("Adding Player 1");
        yourPlayerName = $("#username").val().trim();
        player1 = {
          name: yourPlayerName,
          win: 0,
          loss: 0,
          tie: 0,
          choice: "",
          response: "",
        };
        $("#nameone").text(player1.name);
        console.log(player1);
        console.log(yourPlayerName);
        database.ref().child("/players/player1").set(player1);
        database.ref().child("/turn").set(1);
        database.ref("/players/player1").onDisconnect().remove();
      } else if (player1 !== null && player2 === null) {
        console.log("Adding Player 2");
        yourPlayerName = $("#username").val().trim();
        player2 = {
          name: yourPlayerName,
          win: 0,
          loss: 0,
          tie: 0,
          choice: "",
          response: "",
        };
        $("#nametwo").text(player2.name);
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
        function waitOnInstructions() {
          $("#isToolSelectedOne").html("Select Your Tool!");
          $("#isToolSelectedTwo").html("Player 1's Turn.");
        }
        setTimeout(waitOnInstructions, 0);
      }
      if (snapshot.child("/outcome/").exists()) {
        console.log("player 1 tool selected");
      }
    } else if (snapshot.val() === 2) {
      console.log("TURN 2");
      turn = 2;

      if (player1 && player2) {
        $("#player-1-div").css("border-color", "black");
        $("#player-2-div").css("border-color", "red");
        $("#make-choice").html(
          "<h4>" + player2Name + ", make your choice!</h4>"
        );
      }
      if (snapshot.child("/outcome/").exists()) {
        $("chat-box").append("<h4>" + outcome + "!</h4>");
      }
    }
  });
  database.ref("/chat/").on("child_added", function (snapshot) {
    var chatMsg = snapshot.val();
    var chatEntry = $("<br><br><div>").html(chatMsg);

    $("#chat-box").append(chatEntry);
    $("#chat-box").scrollTop($("#chat-box")[0].scrollHeight);
  });

  $("#chat-send").on("click", function (event) {
    event.preventDefault();

    if (yourPlayerName !== "" && $("#player-chat").val().trim() !== "") {
      var msg = yourPlayerName + ": " + $("#player-chat").val().trim();
      $("#player-chat").val("");
      var chatKey = database.ref().child("/chat/").push().key;
      database.ref("/chat/" + chatKey).set(msg);
    }
  });

  database.ref("/outcome/").on("value", function (snapshot) {
    var inputPlayer1Choice = "";
    var inputPlayer2Choice = "";
    var firstLetter = player1.choice.slice(0, 1);
    var capitalize = firstLetter.toUpperCase();
    var rest = player1.choice.substring(1, player1.choice.length);
    var firstLetterTwo = player2.choice.slice(0, 1);
    var capitalizeTwo = firstLetterTwo.toUpperCase();
    var restTwo = player2.choice.substring(1, player2.choice.length);
    console.log("choice: " + inputPlayer1Choice);
    console.log("choice2: " + inputPlayer2Choice);
    console.log("outcome has changed");

    $("#winOrLoseOne").html(snapshot.val());

    var showAnswerOne = "./" + capitalize + rest + ".png";
    var showAnswerTwo = "./" + capitalizeTwo + restTwo + ".png";

    const showAnswer= () =>  {
      $("#outcomeOne").attr("src", showAnswerOne);
      $("#outcomeOne").attr("alt", inputPlayer1Choice);
      console.log(typeof inputPlayer1Choice);
      console.log($("#outcomeOne").html());
      $("#outcomeTwo").attr("src", showAnswerTwo);
      $("#outcomeTwo").attr("alt", inputPlayer2Choice);
    }
    setTimeout(posfive, 990);
    setTimeout(showAnswer, 1000);
    setTimeout(postwo, 5000);
  });

  database.ref("/players/player1/choice").on("value", function (snapshot) {
    if (player1 && player2) {
      $("#isToolSelectedOne").html("Tool: Selected!");
      $("#isToolSelectedTwo").html("Select Your Tool!");
    }
  });

  $("#tools").on("click", ".btnOne", function (event) {
    event.preventDefault();
    if (player1 && player2 && yourPlayerName === player1.name && turn === 1) {
      var choice = $(this).val().trim();

      player1Choice = player1.choice;
      player1.choice = choice;
      database.ref().child("/players/player1/choice").set(choice);
      console.log("eat Your Food");
      turn = 2;
      database.ref().child("/turn").set(2);
      $("#isToolSelectedOne").html("Tool: Selected!");
      $("#isToolSelectedTwo").html("Select Your Tool!");
      console.log("drink your drink");
    }
  });

  $("#tools").on("click", ".btnOne", function (event) {
    event.preventDefault();
    if (player1 && player2 && yourPlayerName === player2.name && turn === 2) {
      var choice = $(this).val().trim();
      player2.choice = choice;
      database.ref().child("/players/player2/choice").set(choice);
      $("#isToolSelectedTwo").html("Tool: Selected!");
      rpsCompare();
    }
  });
});
