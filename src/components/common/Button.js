import React from 'react';
import { ActivityIndicator, Text, TouchableOpacity, StyleSheet, View } from 'react-native';
import { COLORS, RADIUS, SPACING } from '../../constants/theme';
import { useTheme } from '../../context/ThemeContext';

export function Button({ title, onPress, loading, disabled, variant = 'primary', icon, style, textStyle }) {
  const { theme } = useTheme();
  const isPrimary = variant === 'primary';
  const isOutline = variant === 'outline';

  return (
    <TouchableOpacity
      activeOpacity={0.85}
      disabled={disabled || loading}
      onPress={onPress}
      style={[
        styles.base,
        isPrimary && { backgroundColor: theme.primary },
        isOutline && { backgroundColor: theme.surface, borderColor: theme.border, borderWidth: 1 },
        (disabled || loading) && styles.disabled,
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={isPrimary ? COLORS.white : theme.primary} />
      ) : (
        <View style={styles.inner}>
          {icon}
          <Text style={[styles.text, { color: isPrimary ? theme.primaryText : theme.text }, textStyle]}>{title}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  base: {
    height: 56,
    borderRadius: RADIUS.md,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: SPACING.xl,
  },
  disabled: {
    opacity: 0.55,
  },
  inner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
  },
  text: {
    fontSize: 16,
    fontWeight: '700',
  },
});
