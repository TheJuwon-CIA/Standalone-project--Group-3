import React from 'react';
import { StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Button } from '../../components/common/Button';
import { Screen } from '../../components/common/Screen';
import { COLORS, SPACING } from '../../constants/theme';
import { useTheme } from '../../context/ThemeContext';

export default function SettingsScreen() {
  const router = useRouter();
  const { theme, themeMode, setThemeMode } = useTheme();

  return (
    <Screen>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.iconButton}>
          <Ionicons name="arrow-back" size={23} color={theme.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: theme.text }]}>Settings</Text>
        <TouchableOpacity style={styles.iconButton}>
          <Ionicons name="close" size={24} color={theme.text} />
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={() => router.push('/profile-settings')} style={styles.profileRow}>
        <View style={[styles.profileIcon, { backgroundColor: theme.input }]}>
          <Ionicons name="person-circle-outline" size={38} color={theme.text} />
        </View>
        <View style={styles.profileText}>
          <Text style={[styles.name, { color: theme.text }]}>Immanuel Olajuwon</Text>
          <Text style={[styles.email, { color: theme.text }]}>abodunrinemmanuel81@gmail.com</Text>
          <Text style={[styles.link, { color: theme.primary }]}>Sign out</Text>
        </View>
      </TouchableOpacity>
      <Divider />
      <Section title="General">
        <SettingSwitch label="Enable insights" value={false} />
        <SettingSwitch label="Confirm before deleting" value />
      </Section>
      <Divider />
      <Section title="Color">
        {[
          ['light', 'Light'],
          ['dark', 'Dark'],
          ['system', 'Use my Windows mode'],
        ].map(([mode, label]) => (
          <TouchableOpacity key={mode} style={styles.radioRow} onPress={() => mode !== 'system' && setThemeMode(mode)}>
            <Ionicons
              name={themeMode === mode ? 'radio-button-on' : 'radio-button-off'}
              size={20}
              color={themeMode === mode ? theme.primary : theme.textSoft}
            />
            <Text style={[styles.radioLabel, { color: theme.text }]}>{label}</Text>
          </TouchableOpacity>
        ))}
      </Section>
      <Divider />
      <Section title="Help & feedback">
        <Text style={[styles.bodyText, { color: theme.text }]}>All caught up!</Text>
        <Button title="Sync now" style={styles.syncButton} />
        {['Help', 'Share feedback', 'Rate us', 'Copy Session ID'].map((item) => (
          <Text key={item} style={[styles.settingLink, { color: theme.primary }]}>{item}</Text>
        ))}
      </Section>
      <Divider />
      <Section title="About">
        <Text style={[styles.bodyText, { color: theme.text }]}>Noted 6.1.4.0</Text>
        <Text style={[styles.bodyText, { color: theme.text }]}>© 2026. All rights reserved.</Text>
        {['Export notes', 'Terms of Use', 'Supplemental Terms of Use', 'Privacy Policy', 'Third Party Notices'].map((item) => (
          <Text key={item} style={[styles.settingLink, { color: theme.primary }]}>{item}</Text>
        ))}
      </Section>
    </Screen>
  );
}

function Divider() {
  const { theme } = useTheme();
  return <View style={[styles.divider, { backgroundColor: theme.border }]} />;
}

function Section({ title, children }) {
  const { theme } = useTheme();
  return (
    <View style={styles.section}>
      <Text style={[styles.sectionTitle, { color: theme.text }]}>{title}</Text>
      {children}
    </View>
  );
}

function SettingSwitch({ label, value }) {
  const { theme } = useTheme();
  return (
    <View style={styles.switchRow}>
      <Text style={[styles.bodyText, { color: theme.text }]}>{label}</Text>
      <View style={styles.switchWrap}>
        <Switch value={value} trackColor={{ true: COLORS.primary, false: '#D9DEE7' }} thumbColor="#FFFFFF" />
        <Text style={[styles.onOff, { color: theme.text }]}>{value ? 'On' : 'Off'}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    minHeight: 52,
  },
  iconButton: {
    width: 42,
    height: 42,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    flex: 1,
    fontSize: 20,
    fontWeight: '700',
  },
  profileRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SPACING.xl,
    gap: SPACING.lg,
  },
  profileIcon: {
    width: 58,
    height: 58,
    borderRadius: 29,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileText: {
    flex: 1,
  },
  name: {
    fontSize: 21,
    fontWeight: '900',
  },
  email: {
    fontSize: 12,
    marginTop: 2,
  },
  link: {
    fontSize: 13,
    fontWeight: '700',
    marginTop: 4,
  },
  divider: {
    height: 1,
    marginVertical: SPACING.lg,
  },
  section: {
    gap: SPACING.lg,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '800',
    marginBottom: SPACING.md,
  },
  bodyText: {
    fontSize: 14,
    lineHeight: 22,
  },
  switchRow: {
    gap: SPACING.sm,
  },
  switchWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
  },
  onOff: {
    fontSize: 13,
    fontWeight: '600',
  },
  radioRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.md,
  },
  radioLabel: {
    fontSize: 15,
  },
  syncButton: {
    alignSelf: 'flex-start',
    height: 44,
    borderRadius: 7,
  },
  settingLink: {
    fontSize: 14,
  },
});
