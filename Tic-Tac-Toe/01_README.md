# Tic-Tac-Toe Game

1. Create new app: `tic-tac-toe`.
2. Create a new file `screens/GameBoardScreen.js` with the game board(3x3. View -> Touchable)
   note: use borderWidth to change the style.
3. Add a new file `components/Header.js` - with the game header.
   Its text will be sent as a prop from outside.
4. Call the 2 components in the App.js file.

# After:

1. Add 2 states -> board and player.
2. Add the icons library, and show them
3. Add function to calculate each press
4. Add function to calculate victory.
5. Show an alert in the end of the game

# Alert

- Alert is built-in component in react-native(not core).

Gets 3 values:

1. title
2. message
3. AlertButton[] - array of button options

```js
(property) AlertStatic.alert: (title: string, message?: string, buttons?: AlertButton[], options?: AlertOptions) => void
```
