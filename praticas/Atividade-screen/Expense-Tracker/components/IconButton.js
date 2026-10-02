import React from "react";
import { Pressable, View } from "react-native";

function IconButton(icon, size, color, onPress) {
  return (
    <View>
      <Pressable
        onPress={() => { pressed }}
        style={({ pressed }) => [
          {
            backgroundColor: pressed ? "{rgb(210, 230, 255), opacity: 0.5}" : "white",
          },
        ]}
      >
        <ion-icon name={icon} size={size} color={color}></ion-icon>
      </Pressable>
    </View>
  );
}

export default IconButton;
