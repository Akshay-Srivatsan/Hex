# Hex
A simple Javascript implementation of Hex. It uses TogetherJS for rudimentary online multiplayer (it can also be played in local multiplayer mode). Due to differences in the handling of CSS between browsers, it works best in Chrome for desktop. Some other browser (like Firefox for desktop) are usable (there are random white lines on the game board, but everything works fine other than that), but others (like Safari) distort the game board significantly. I made this in (approximately) 3 hours, 15 minutes on August 21, 2015.

## Rules/Information
<https://en.wikipedia.org/wiki/Hex_(board_game)>

## System Requirements
* Chrome or Firefox for desktop (other browsers and mobile browser may or may not work).
* JavaScript

## Bugs/To Do:
* The game doesn't render properly on many browsers.
* The game doesn't use TogetherJS to sync the game state when the second player joins -- if the first player has already placed their tile, the games will be out of sync until both players reload.
* Multiplayer would be much smoother if it used a dedicated server and WebSockets, rather than relying on TogetherJS to emulate mouse clicks.
