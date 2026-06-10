import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { SHADOWS } from '../../constants/theme';
import { useTheme } from '../../context/ThemeContext';

export function FloatingActionButton() {
  const router = useRouter();
  const { theme } = useTheme();

  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={() => router.push('/create-note')}
      style={[styles.button, { backgroundColor: theme.primary }, SHADOWS.md]}
    >
      <Ionicons name="add" size={32} color={theme.primaryText} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    right: 20,
    bottom: 82,
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
});