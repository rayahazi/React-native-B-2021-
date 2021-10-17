# useRef hook:

useRef returnes a mutable ref object, that gets initialized value.

- The returned object will have a full lifetime of the component (it keeps the mutable values)

- keep the value of the JavaScript object after any render. 


## Class task

1. Create `GameOverScreen` in screens folder. 
    * inside: simple text of `GAME IS OVER`
2. Import to App.js and make sure it will be shown when game is over. 

> note: in app.js keep a state that will hold the number of rounds. (you can use this state - if it will change - go to gameOverScreen)