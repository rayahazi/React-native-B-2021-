# Scroll view

- Is a core component (similar to div in HTML).
- Allow us to scroll when we have many items in the page.

```js
import React from "react";
import { StyleSheet, Text, Image, ScrollView } from "react-native";

const img = {
  uri: "https://pbs.twimg.com/media/D3-P0XbXkAUcq_3.jpg",
  height: 50,
  width: 50,
};

export default function App() {
  return (
    <ScrollView>
      <Text style={styles.text}>Start</Text>
      <Image source={img} />
      <Image source={img} />
      <Image source={img} />
      <Image source={img} />
      <Image source={img} />
      <Image source={img} />
      <Image source={img} />
      <Image source={img} />
      <Image source={img} />
      <Text style={styles.text}>Middle</Text>
      <Image source={img} />
      <Image source={img} />
      <Image source={img} />
      <Image source={img} />
      <Image source={img} />
      <Image source={img} />
      <Image source={img} />
      <Image source={img} />
      <Text style={styles.text}>End</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 40,
    color: "black",
  },
});
```
