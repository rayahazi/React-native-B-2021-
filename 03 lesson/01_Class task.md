# Class task

1. Create react-native app.
2. Create new file `MyBankAccount`

   - create arrow function to export.
   - return View component with Text inside it,
   - The Text component will show `Bank name`, `Bank account`, `MoneyInTheBank`.

3. In App.js
   - create 3 InputText to ask from the user for his details.
   - keep the data in useState elements.
   - Show the user details using the `MyBankAccount` components.

Add design to the App.

### Goodluck!

## Solution:

- MyBankAccount.js

```js
import React from "react";
import { View, Text, StyleSheet } from "react-native";

const MyBankAccount = (props) => {
  return (
    <View>
      <Text style={styles.txt1}>Bank details</Text>
      <Text>
        {props.bankName}, {props.bankAccount} : {props.money}{" "}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  txt1: {
    fontSize: 25,
    color: "gray",
  },
});

export default MyBankAccount;
```

- App.js

```js
import React, { useState } from "react";
import { StyleSheet, TextInput, View, Text } from "react-native";
import MyBankAccount from "./MyBankAccount";

export default function App() {
  const [bankDetails, setBankDetails] = useState({
    bankName: "",
    bankAccount: 0,
    money: 0,
  });

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Enter your bank account details</Text>

      <TextInput
        style={styles.input}
        keyboardType="default"
        placeholder="bank name..."
        onChangeText={(txt) =>
          setBankDetails({ ...bankDetails, bankName: txt })
        }
      />

      <TextInput
        style={styles.input}
        keyboardType="numeric"
        placeholder="bank account number..."
        onChangeText={(txt) =>
          setBankDetails({ ...bankDetails, bankAccount: Number(txt) })
        }
      />

      <TextInput
        style={styles.input}
        keyboardType="numeric"
        placeholder="Money in the bank..."
        onChangeText={(txt) =>
          setBankDetails({ ...bankDetails, money: Number(txt) })
        }
      />

      <MyBankAccount
        bankName={bankDetails.bankName}
        bankAccount={bankDetails.bankAccount}
        money={bankDetails.money}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    fontSize: 20,
    color: "gray",
    margin: 10,
  },
  input: {
    borderColor: "gray",
    borderWidth: 1,
    width: "50%",
    margin: 5,
  },
});
```
