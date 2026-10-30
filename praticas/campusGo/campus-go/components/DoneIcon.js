import { Pressable, Text } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withSpring,
} from 'react-native-reanimated';
import { colors } from '../styles/theme';

export function DoneIcon({ completed, onPress }) {
  const scale = useSharedValue(1);
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.get() }],
  }));

  function bounce() {
    scale.set(withSequence(withSpring(1.25), withSpring(1)));
    onPress();
  }

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={completed ? 'Reabrir tarefa' : 'Concluir tarefa'}
      onPress={bounce}
      hitSlop={10}
    >
      <Animated.View
        style={[
          {
            width: 30,
            height: 30,
            borderRadius: 15,
            borderWidth: 2,
            borderColor: completed ? colors.success : colors.border,
            backgroundColor: completed ? colors.success : colors.surface,
            alignItems: 'center',
            justifyContent: 'center',
          },
          animatedStyle,
        ]}
      >
        {completed ? <Text style={{ color: colors.surface, fontWeight: '700' }}>✓</Text> : null}
      </Animated.View>
    </Pressable>
  );
}
