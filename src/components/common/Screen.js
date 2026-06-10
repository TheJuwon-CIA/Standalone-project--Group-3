import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../context/ThemeContext';

export function Screen({ children, scroll = true, contentStyle, style }) {
  const { theme } = useTheme();
  const Container = scroll ? ScrollView : View;

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: theme.background }, style]}>
      <View pointerEvents="none" style={styles.pattern}>
        {Array.from({ length: 260 }).map((_, index) => (
          <View key={index} style={[styles.dot, { backgroundColor: theme.patternDot }]} />
        ))}
      </View>
      <Container
        style={styles.flex}
        contentContainerStyle={scroll ? [styles.content, contentStyle] : undefined}
        showsVerticalScrollIndicator={false}
      >
        {children}
      </Container>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
  },
  flex: {
    flex: 1,
  },
  content: {
    padding: 14,
    paddingBottom: 104,
  },
  pattern: {
    ...StyleSheet.absoluteFillObject,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 13,
    padding: 4,
    opacity: 0.55,
  },
  dot: {
    width: 3,
    height: 3,
    borderRadius: 2,
  },
});