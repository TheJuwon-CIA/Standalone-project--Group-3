import React from 'react';
import { Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { RADIUS } from '../../constants/theme';
import { useTheme } from '../../context/ThemeContext';

export function ThemeToggle() {
  const { theme, themeMode, setThemeMode } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.input }]}>
      {['light', 'dark'].map((mode) => {
        const active = themeMode === mode;
        return (
          <TouchableOpacity
            key={mode}
            activeOpacity={0.8}
            onPress={() => setThemeMode(mode)}
            style={[styles.option, active && { backgroundColor: theme.surface, borderColor: theme.border }]}
          >
            <Ionicons name={mode === 'light' ? 'sunny' : 'moon'} size={16} color={active ? theme.primary : theme.text} />
            <Text style={[styles.label, { color: active ? theme.primary : theme.text }]}>
              {mode === 'light' ? 'Light' : 'Dark'}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 52,
    borderRadius: RADIUS.sm,
    padding: 4,
    flexDirection: 'row',
  },
  option: {
    flex: 1,
    borderRadius: RADIUS.sm,
    borderWidth: 1,
    borderColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 8,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
  },
});

