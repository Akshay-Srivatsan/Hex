var lastMove;
var currentMove = "red";
var cellArray = [];
var gameOver = false;

function generate(depth, width, maxDepth) {
  if (!maxDepth) {
    maxDepth = depth;
  }
  if (depth == 0) {
    return null;
  }
  var ul = document.createElement("ul");
  var li1 = document.createElement("li");
  ul.appendChild(li1);
  var rowArray = [];
  for (var i = 0; i < width; i++) {
    var span = document.createElement("span");
    rowArray.push(span);
    span.className = "hex gray";
    li1.appendChild(span);
    span.onclick = function(e) {
      if (gameOver) {
        return;
      }
      var current = e.currentTarget;
      if (current.className == "hex gray") {
        current.className = "hex " + currentMove;
        updateMove();
      };

    }
  }
  cellArray.push(rowArray);
  var li2 = document.createElement("li");
  var rest = generate(depth - 1, width, maxDepth);
  if (rest) {
    li2.appendChild(rest);
    ul.appendChild(li2);
  }
  return ul;
}

function main() {
  var params = window.location.search.substr(1).split("&");
  var width = 11;
  var height = 11;
  if (params.length == 2) {
    width = parseInt(params[0].split("=")[1]) || 11;
    height = parseInt(params[1].split("=")[1]) || 11;
  }
  console.log(params);

  document.getElementById("width").value = width;
  document.getElementById("height").value = height;

  document.getElementById("hex").appendChild(generate(height, width));
  document.body.style.width = (((41*width) + 100) + (20 * height)) + "px";
}
main();

function updateMove() {
  if (currentMove == "red") {
    currentMove = "blue";
  } else {
    currentMove = "red";
  }
  document.getElementById("currentMove").innerHTML = "It is " + currentMove + "'s move.";
  scanConnections();
}

function scanConnections() {
  for (var i = 0; i < cellArray.length; i++) {
    //red
    if(scanRedConnection(0, i, "")) {
      alert("Red wins!");
      document.getElementById("currentMove").innerHTML = "Red wins!";
      gameOver = true;
    };
  }
  for (var i = 0; i < cellArray[0].length; i++) {
    //blue
    if(scanBlueConnection(i, 0, "")) {
      alert("Blue wins!");
      document.getElementById("currentMove").innerHTML = "Blue wins!";
      gameOver = true;
    };
  }
}

function scanBlueConnection(x, y, history) {

  if (y < 0 || y >= cellArray[0].length || x < 0 || x >= cellArray.length) {
    return false;
  }

  var current = cellArray[y][x];
  if (current.className.indexOf("blue") == -1) {
    return false;
  }

  if (coordinatesInHistory(x, y, history)) {
    return false;
  }

  if (y == cellArray[0].length - 1) {
    return true;
  }
  console.log(current);

  history = pushCoordinates(x, y, history);
  return scanBlueConnection(x, y-1, history) ||
          scanBlueConnection(x, y+1, history) ||
          scanBlueConnection(x+1, y-1, history) ||
          scanBlueConnection(x-1, y+1, history) ||
          scanBlueConnection(x-1, y, history) ||
          scanBlueConnection(x+1, y, history);
}

function scanRedConnection(x, y, history) {

  if (y < 0 || y >= cellArray[0].length || x < 0 || x >= cellArray.length) {
    return false;
  }

  var current = cellArray[y][x];
  if (current.className.indexOf("red") == -1) {
    return false;
  }

  if (coordinatesInHistory(x, y, history)) {
    return false;
  }

  if (x == cellArray.length - 1) {
    return true;
  }
  console.log(current);

  history = pushCoordinates(x, y, history);
  return scanRedConnection(x, y-1, history) ||
          scanRedConnection(x, y+1, history) ||
          scanRedConnection(x+1, y-1, history) ||
          scanRedConnection(x-1, y+1, history) ||
          scanRedConnection(x-1, y, history) ||
          scanRedConnection(x+1, y, history);
}

function coordinatesInHistory(x, y, history) {
  return history.indexOf(formatCoordinates(x, y)) != -1;
}

function formatCoordinates(x, y) {
  return x + "," + y + ";";
}

function pushCoordinates(x, y, history) {
  return history + formatCoordinates(x, y);
}

window.addEventListener("beforeunload", function(e) {
  e.preventDefault();
  e.cancelBubble = !gameOver;
  e.returnValue = "If you leave, you will lose your current progress.";
  return;

});
