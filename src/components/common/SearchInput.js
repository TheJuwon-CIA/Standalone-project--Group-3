import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { RADIUS, SPACING } from '../../constants/theme';
import { useTheme } from '../../context/ThemeContext';

export function SearchInput({ placeholder = 'Search your thoughts...', value, onChangeText, style }) {
  const { theme } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.surface, borderColor: theme.border }, style]}>
      <Ionicons name="search" size={19} color={theme.label} />
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={theme.label}
        style={[styles.input, { color: theme.text }]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    minHeight: 40,
    borderWidth: 1,
    borderRadius: RADIUS.md,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.md,
    gap: SPACING.sm,
  },
  input: {
    flex: 1,
    fontSize: 14,
    paddingVertical: SPACING.sm,
  },
});
