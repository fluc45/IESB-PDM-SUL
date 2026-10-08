import { Ionicons } from "@expo/vector-icons";
import { Pressable } from "react-native";

function IconButton({ icon, size, color, onPress }) {
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => ({
        marginRight: 8,
        opacity: pressed ? 0.5 : 1,
      })}
    >
      <Ionicons name={icon} size={size} color={color} />
    </Pressable>
  );
}

export default IconButton;
