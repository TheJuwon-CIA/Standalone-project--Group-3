import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Button } from '../../components/common/Button';
import { Header } from '../../components/common/Header';
import { Screen } from '../../components/common/Screen';
import { ThemeToggle } from '../../components/common/ThemeToggle';
import { RADIUS, SHADOWS, SPACING } from '../../constants/theme';
import { useTheme } from '../../context/ThemeContext';

export default function ProfileSettingsScreen() {
  const router = useRouter();
  const { theme } = useTheme();
  const [displayName, setDisplayName] = useState('John Doe');
  const [email, setEmail] = useState('hello@example.com');
  const [password, setPassword] = useState('password');

  return (
    <Screen>
      <Header showMenu avatar onRightPress={() => router.push('/(tabs)/settings')} />
      <View style={[styles.card, { backgroundColor: theme.surface, borderColor: theme.border }, SHADOWS.md]}>
        <Text style={[styles.title, { color: theme.text }]}>Profile Settings</Text>
        <View style={styles.avatarWrap}>
          <View style={[styles.avatar, { backgroundColor: theme.surfaceAlt }]}>
            <Ionicons name="phone-portrait" size={42} color={theme.text} />
          </View>
          <TouchableOpacity style={[styles.editBadge, { backgroundColor: theme.primary }]}>
            <Ionicons name="pencil" size={18} color={theme.primaryText} />
          </TouchableOpacity>
        </View>
        <Label text="Display Name" />
        <TextInput
          value={displayName}
          onChangeText={setDisplayName}
          placeholder="Display name"
          placeholderTextColor={theme.label}
          style={[styles.input, { backgroundColor: theme.input, color: theme.text }]}
        />
        <Label text="App Theme" />
        <ThemeToggle />
        <View style={[styles.tabs, { borderColor: theme.border }]}>
          <Text style={[styles.tabActive, { color: theme.primary, borderColor: theme.primary }]}>Login</Text>
          <Text style={[styles.tab, { color: theme.text }]}>Sign Up</Text>
        </View>
        <Label text="Email Address" />
        <TextInput
          value={email}
          onChangeText={setEmail}
          placeholder="Email address"
          placeholderTextColor={theme.label}
          keyboardType="email-address"
          autoCapitalize="none"
          style={[styles.input, { backgroundColor: theme.input, color: theme.text }]}
        />
        <Label text="Password" />
        <TextInput
          value={password}
          onChangeText={setPassword}
          placeholder="Password"
          placeholderTextColor={theme.label}
          secureTextEntry
          style={[styles.input, { backgroundColor: theme.input, color: theme.text }]}
        />
        <Text style={[styles.forgot, { color: theme.primary }]}>Forgot Password?</Text>
        <Button title="Login" style={styles.loginButton} />
        <View style={styles.orRow}>
          <View style={[styles.line, { backgroundColor: theme.border }]} />
          <Text style={[styles.orText, { color: theme.text }]}>Or continue with</Text>
          <View style={[styles.line, { backgroundColor: theme.border }]} />
        </View>
        <View style={styles.socialRow}>
          <Button title="Google" variant="outline" style={styles.socialButton} icon={<Text style={styles.google}>G</Text>} />
          <Button title="Apple" variant="outline" style={styles.socialButton} icon={<Ionicons name="logo-apple" size={21} color={theme.text} />} />
        </View>
      </View>
      <Text style={[styles.terms, { color: theme.text }]}>By continuing, you agree to our <Text style={{ color: theme.primary }}>Terms of Service</Text> and <Text style={{ color: theme.primary }}>Privacy Policy</Text>.</Text>
    </Screen>
  );
}

function Label({ text }) {
  const { theme } = useTheme();
  return <Text style={[styles.label, { color: theme.text }]}>{text}</Text>;
}

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderRadius: RADIUS.lg,
    padding: SPACING.xl,
    marginTop: SPACING.xl,
  },
  title: {
    textAlign: 'center',
    fontSize: 26,
    fontWeight: '800',
    marginBottom: SPACING.xxxl,
  },
  avatarWrap: {
    alignSelf: 'center',
    marginBottom: SPACING.xl,
  },
  avatar: {
    width: 86,
    height: 86,
    borderRadius: 43,
    alignItems: 'center',
    justifyContent: 'center',
  },
  editBadge: {
    position: 'absolute',
    right: -4,
    bottom: 0,
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginTop: SPACING.lg,
    marginBottom: SPACING.sm,
  },
  input: {
    minHeight: 60,
    borderRadius: RADIUS.sm,
    paddingHorizontal: SPACING.xl,
    fontSize: 19,
  },
  tabs: {
    marginHorizontal: -SPACING.xl,
    marginTop: SPACING.xl,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    flexDirection: 'row',
  },
  tabActive: {
    flex: 1,
    textAlign: 'center',
    paddingVertical: SPACING.lg,
    fontSize: 16,
    fontWeight: '700',
    borderBottomWidth: 3,
  },
  tab: {
    flex: 1,
    textAlign: 'center',
    paddingVertical: SPACING.lg,
    fontSize: 16,
    fontWeight: '700',
  },
  forgot: {
    alignSelf: 'flex-end',
    marginTop: SPACING.lg,
    fontSize: 14,
    fontWeight: '700',
  },
  loginButton: {
    marginTop: SPACING.xxl,
  },
  orRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.md,
    marginVertical: SPACING.xxl,
  },
  line: {
    flex: 1,
    height: 1,
  },
  orText: {
    fontSize: 14,
  },
  socialRow: {
    flexDirection: 'row',
    gap: SPACING.lg,
  },
  socialButton: {
    flex: 1,
  },
  google: {
    color: '#4285F4',
    fontSize: 20,
    fontWeight: '900',
  },
  terms: {
    marginTop: SPACING.xxxl,
    textAlign: 'center',
    fontSize: 16,
    lineHeight: 24,
  },
});
