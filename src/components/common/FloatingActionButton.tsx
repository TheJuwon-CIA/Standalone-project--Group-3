import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { SHADOWS } from '../../constants/theme';
import { useTheme } from '../../context/ThemeContext';

export function FloatingActionButton({ icon = 'add', onPress }: { icon?: string; onPress?: () => void }) {
  const router = useRouter();
  const { theme } = useTheme();

  const handlePress = () => {
    if (onPress) {
      onPress();
    } else {
      router.push('/create-note' as any);
    }
  };

  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={handlePress}
      style={[styles.button, { backgroundColor: theme.primary }, SHADOWS.md]}
    >
      <Ionicons name={icon as any} size={32} color={theme.primaryText} />
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

