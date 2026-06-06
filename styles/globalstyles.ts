import { StyleSheet } from 'react-native';

export const colors = {
  primary: '#6200ee',
  background: '#f5f5f5',
  white: '#fff',
  textDark: '#333',
  textLight: '#666',
  border: '#ddd',
  delete: '#ff4444',
};

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 16,
  },
  inputContainer: {
    marginBottom: 20,
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  titleInput: {
    fontSize: 18,
    fontWeight: '600',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    marginBottom: 8,
  },
  contentInput: {
    fontSize: 16,
    paddingVertical: 8,
    minHeight: 80,
    textAlignVertical: 'top',
  },
  addButton: {
    backgroundColor: colors.primary,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  addButtonText: {
    color: colors.white,
    fontWeight: 'bold',
    fontSize: 16,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 50,
    fontSize: 16,
    color: colors.textLight,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 20,
    width: '85%',
    maxHeight: '70%',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    color: colors.textDark,
  },
  modalDate: {
    fontSize: 12,
    color: colors.textLight,
    marginBottom: 16,
  },
  modalBody: {
    fontSize: 16,
    lineHeight: 22,
    marginBottom: 20,
    color: colors.textDark,
  },
  closeButton: {
    backgroundColor: colors.primary,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  closeButtonText: {
    color: colors.white,
    fontWeight: 'bold',
  },
});
