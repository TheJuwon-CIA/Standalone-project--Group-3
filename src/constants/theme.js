export const COLORS = {
  primary: '#4F46E5',
  primaryDark: '#3B2FD1',
  primaryLight: '#EEF2FF',
  secondary: '#F8FAFC',
  tertiary: '#6366F1',
  neutral: '#1E293B',
  ink: '#0F172A',
  muted: '#64748B',
  softText: '#8A8FA3',
  border: '#D8D3EA',
  borderStrong: '#C7C2DD',
  white: '#FFFFFF',
  danger: '#D51F1F',
  success: '#14B87A',
  warning: '#F4A62A',
  overlay: 'rgba(15, 23, 42, 0.12)',
};

export const LIGHT_THEME = {
  mode: 'light',
  background: '#F7F7FC',
  patternDot: '#CBD0D8',
  surface: '#FFFFFF',
  surfaceAlt: '#F1F4FF',
  text: COLORS.ink,
  textSoft: COLORS.muted,
  label: '#8A8FA3',
  border: COLORS.border,
  nav: '#FFFFFF',
  input: '#EAF0FF',
  elevated: '#FFFFFF',
  cardShadow: 'rgba(30, 41, 59, 0.12)',
  primary: COLORS.primary,
  primaryText: '#FFFFFF',
  chip: '#EAF0FF',
  chipText: '#4A5B88',
};

export const DARK_THEME = {
  mode: 'dark',
  background: '#0B1020',
  patternDot: '#273149',
  surface: '#131A2B',
  surfaceAlt: '#1E293B',
  text: '#F8FAFC',
  textSoft: '#B6BED1',
  label: '#8F9BB3',
  border: '#334155',
  nav: '#111827',
  input: '#202A44',
  elevated: '#182136',
  cardShadow: 'rgba(0, 0, 0, 0.35)',
  primary: '#7C73FF',
  primaryText: '#FFFFFF',
  chip: '#263352',
  chipText: '#DDE4FF',
};

export const FONTS = {
  regular: 'System',
  medium: 'System',
  semiBold: 'System',
  bold: 'System',
};

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
};

export const RADIUS = {
  sm: 6,
  md: 10,
  lg: 14,
  xl: 20,
  full: 999,
};

export const SHADOWS = {
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 5,
  },
};