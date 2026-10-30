import { useEffect, useState } from 'react';
import { Animated } from 'react-native';

export function FadeIn({ children, style }) {
  const [opacity] = useState(() => new Animated.Value(0));

  useEffect(() => {
    const animation = Animated.timing(opacity, {
      toValue: 1,
      duration: 400,
      useNativeDriver: true,
    });
    animation.start();
    return () => animation.stop();
  }, [opacity]);

  return <Animated.View style={[{ opacity }, style]}>{children}</Animated.View>;
}
