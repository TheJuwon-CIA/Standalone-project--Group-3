import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { COLORS, SPACING } from '../../constants/theme';
import { useTheme } from '../../context/ThemeContext';

export function Header({ title = 'Noted', showBack = false, showMenu = false, rightIcon, onRightPress, avatar, style }) {
  const router = useRouter();
  const { theme } = useTheme();

  return (
    <View style={[styles.container, style]}>
      <TouchableOpacity
        activeOpacity={0.75}
        onPress={showBack ? () => router.back() : undefined}
        style={styles.iconButton}
      >
        {showBack && <Ionicons name="arrow-back" size={23} color={theme.text} />}
        {showMenu && <Ionicons name="menu" size={24} color={theme.primary} />}
      </TouchableOpacity>
      <Text style={[styles.title, { color: theme.primary }]}>{title}</Text>
      <TouchableOpacity activeOpacity={0.75} onPress={onRightPress} style={styles.iconButton}>
        {avatar ? (
          <View style={[styles.avatar, { backgroundColor: theme.surfaceAlt, borderColor: theme.border }]}>
            <Ionicons name="phone-portrait" size={22} color={theme.text} />
          </View>
        ) : rightIcon ? (
          <Ionicons name={rightIcon} size={23} color={rightIcon === 'trash-outline' ? COLORS.danger : theme.primary} />
        ) : null}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    minHeight: 54,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.md,
  },
  iconButton: {
    width: 34,
    height: 34,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    flex: 1,
    fontSize: 24,
    fontWeight: '800',
    marginLeft: SPACING.sm,
  },
  avatar: {
    width: 38,
    height: 38,
    borderRadius: 19,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});