import { StyleSheet, Platform, StatusBar } from 'react-native';

export const theme = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#ffffff',
    // Parche dinámico para la barra de estado en Android:
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 
  },
  
  center: { justifyContent: 'center', alignItems: 'center' },
  loadingText: { marginTop: 10, fontSize: 13, fontWeight: 'bold', color: '#004424' },
  scrollContainer: { padding: 14, backgroundColor: '#ffffff' },
  
  // Barra Superior Multihoja
  multiCharacterBar: { flexDirection: 'row', backgroundColor: '#004424', padding: 8, alignItems: 'center', justifyContent: 'space-between', borderBottomWidth: 1, borderBottomColor: '#d4d4d8' },
  pickerManagerWrapper: { flex: 1, borderWidth: 1, borderColor: '#ffffff', borderRadius: 4, marginRight: 6, backgroundColor: 'rgba(255,255,255,0.15)', overflow: 'hidden', height: 40, justifyContent: 'center' },
  pickerSelectorNativo: { width: '100%', color: '#ffffff' },
  multiBarActionsGroup: { flexDirection: 'row', gap: 4 },
  barButtonAdd: { backgroundColor: '#16a34a', paddingHorizontal: 10, paddingVertical: 10, borderRadius: 4, justifyContent: 'center' },
  barButtonDelete: { backgroundColor: '#dc2626', paddingHorizontal: 10, paddingVertical: 10, borderRadius: 4, justifyContent: 'center' },
  barButtonText: { color: '#ffffff', fontSize: 11, fontWeight: 'bold' },

  header: { borderBottomWidth: 4, borderBottomColor: '#004424', paddingBottom: 6, marginBottom: 16, marginTop: 6, alignItems: 'center' },
  headerTitle: { fontSize: 28, fontWeight: '900', color: '#004424' },
  headerSubtitleContainer: { backgroundColor: '#f4f4f5', paddingHorizontal: 12, paddingVertical: 2, marginTop: 4, borderRadius: 4 },
  headerSubtitle: { fontSize: 10, fontWeight: 'bold', textTransform: 'uppercase', color: '#004424' },
  
  summary: { backgroundColor: '#004424', paddingHorizontal: 12, paddingVertical: 10, borderTopLeftRadius: 4, borderTopRightRadius: 4, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 12 },
  summaryText: { fontSize: 12, fontWeight: 'bold', color: '#ffffff', textTransform: 'uppercase' },
  summaryArrow: { fontSize: 10, color: '#ffffff', opacity: 0.8 },
  detailsBox: { borderLeftWidth: 1, borderRightWidth: 1, borderBottomWidth: 1, borderColor: '#d4d4d8', padding: 12, backgroundColor: '#fcfbfa', borderBottomLeftRadius: 4, borderBottomRightRadius: 4, flexDirection: 'column', gap: 10, width: '100%' },
  
  verticalField: { flexDirection: 'column', gap: 4, width: '100%' },
  fieldLabelPrimary: { fontSize: 9, fontWeight: 'bold', textTransform: 'uppercase', color: '#004424' },
  fieldLabel: { fontSize: 8, fontWeight: 'bold', textTransform: 'uppercase', color: '#71717a', marginBottom: 2 },
  inputBold: { width: '100%', borderWidth: 1, borderColor: '#d4d4d8', borderRadius: 4, paddingHorizontal: 8, paddingVertical: 6, fontSize: 13, fontWeight: 'bold', backgroundColor: '#ffffff', color: '#004424' },
  input: { width: '100%', borderWidth: 1, borderColor: '#d4d4d8', borderRadius: 4, paddingHorizontal: 8, paddingVertical: 6, fontSize: 12, backgroundColor: '#ffffff', color: '#000000' },
  rowLayout: { flexDirection: 'row', width: '100%' },
  inputCenterBold: { width: '100%', borderWidth: 1, borderColor: '#d4d4d8', borderRadius: 4, paddingVertical: 6, textAlign: 'center', fontSize: 13, fontWeight: 'bold', backgroundColor: '#ffffff', color: '#000000' },
  inputCenter: { width: '100%', borderWidth: 1, borderColor: '#d4d4d8', borderRadius: 4, paddingVertical: 4, textAlign: 'center', fontSize: 11, backgroundColor: '#ffffff', color: '#000000' },
  
  heroPointsContainer: { borderTopWidth: 1, borderTopColor: '#e4e4e7', paddingTop: 8, marginTop: 4 },
  heroButton: { width: 32, height: 32, borderRadius: 4, borderWidth: 1, justifyContent: 'center', alignItems: 'center', marginRight: 8 },
  heroButtonActive: { backgroundColor: '#004424', borderColor: '#004424' },
  heroButtonInactive: { backgroundColor: '#ffffff', borderColor: '#d4d4d8' },
  heroTextActive: { color: '#ffffff', fontSize: 12, fontWeight: 'bold' },
  heroTextInactive: { color: '#a1a1aa', fontSize: 12, fontWeight: 'bold' },
  
  combateCard: { borderWidth: 1, borderColor: '#a1a1aa', borderRadius: 4, padding: 12, backgroundColor: '#ffffff', flexDirection: 'column', gap: 12, marginVertical: 4, width: '100%', shadowColor: '#000000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 2, elevation: 1 },
  quickStatBox: { flex: 1, borderWidth: 1, borderColor: '#d4d4d8', padding: 8, borderRadius: 4, backgroundColor: '#f4f4f5', alignItems: 'center', justifyContent: 'center' },
  quickStatLabelPrimary: { fontSize: 9, fontWeight: 'bold', textTransform: 'uppercase', color: '#004424', marginBottom: 2 },
  quickStatLabel: { fontSize: 9, fontWeight: 'bold', textTransform: 'uppercase', color: '#71717a', marginBottom: 2 },
  quickStatValuePrimary: { fontSize: 24, fontWeight: '900', color: '#004424' },
  hpInput: { width: '100%', borderBottomWidth: 1, borderBottomColor: '#d4d4d8', textAlign: 'center', fontSize: 16, fontWeight: '900', color: '#065f46', padding: 0 },
  speedRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center' },
  speedInput: { width: 30, textAlign: 'center', fontSize: 13, fontWeight: 'bold', padding: 0, color: '#000000' },
  unitText: { fontSize: 10, color: '#71717a', marginLeft: 1 },
  
  hpManagerBox: { borderWidth: 1, borderColor: '#d4d4d8', padding: 10, borderRadius: 4, backgroundColor: '#fcfbfa', flexDirection: 'column', gap: 6 },
  subBoxLabel: { fontSize: 9, fontWeight: 'bold', color: '#004424', textTransform: 'uppercase', textAlign: 'center' },
  inputCenterBoldText: { width: '100%', borderWidth: 1, borderColor: '#e4e4e7', borderRadius: 4, paddingVertical: 4, textAlign: 'center', fontSize: 12, fontWeight: 'bold', backgroundColor: '#ffffff', color: '#52525b' },
  statesRow: { flexDirection: 'row', borderTopWidth: 1, borderTopColor: '#e4e4e7', paddingTop: 8, marginTop: 4, gap: 8 },
  stateCell: { flex: 1, borderWidth: 1, borderColor: '#e4e4e7', borderRadius: 4, padding: 4, backgroundColor: '#ffffff', alignItems: 'center' },
  stateLabelDying: { fontSize: 9, fontWeight: 'bold', color: '#991b1b' },
  stateLabelWounded: { fontSize: 9, fontWeight: 'bold', color: '#92400e' },
  stateInputDying: { width: '100%', textAlign: 'center', fontWeight: 'bold', fontSize: 13, color: '#991b1b', padding: 0, borderBottomWidth: 1, borderBottomColor: '#e4e4e7' },
  stateInputWounded: { width: '100%', textAlign: 'center', fontWeight: 'bold', fontSize: 13, color: '#92400e', padding: 0, borderBottomWidth: 1, borderBottomColor: '#e4e4e7' },
  
  perceptionContainerIndependent: { borderWidth: 1, borderColor: '#d4d4d8', padding: 8, borderRadius: 4, backgroundColor: '#f4f4f5' },
  selectorRowGroup: { flex: 1, flexDirection: 'row', backgroundColor: '#e4e4e7', borderRadius: 6, padding: 2, marginRight: 8 },
  selectorButtonState: { flex: 1, paddingVertical: 6, justifyContent: 'center', alignItems: 'center', borderRadius: 4 },
  selectorButtonActive: { backgroundColor: '#004424' },
  selectorButtonInactive: { backgroundColor: 'transparent' },
  selectorTextActive: { color: '#ffffff', fontSize: 11, fontWeight: '900' },
  selectorTextInactive: { color: '#52525b', fontSize: 11, fontWeight: 'bold' },
  
  selectorRowGroupSmall: { flexDirection: 'row', backgroundColor: '#e4e4e7', borderRadius: 4, padding: 1.5 },
  selectorButtonStateSmall: { flex: 1, paddingVertical: 4, justifyContent: 'center', alignItems: 'center', borderRadius: 3 },
  selectorTextActiveSmall: { color: '#ffffff', fontSize: 9, fontWeight: '900' },
  selectorTextInactiveSmall: { color: '#52525b', fontSize: 9, fontWeight: 'bold' },

  modBadge: { width: 38, height: 32, borderWidth: 1, borderColor: '#004424', backgroundColor: '#ffffff', borderRadius: 4, justifyContent: 'center', alignItems: 'center', flexShrink: 0 },
  modBadgeText: { fontSize: 13, fontWeight: '900', color: '#004424' },
  
  attrRowIndependent: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderWidth: 1, borderColor: '#d4d4d8', borderRadius: 4, padding: 8, backgroundColor: '#ffffff' },
  attrLabelText: { fontSize: 11, fontWeight: 'bold', color: '#3f3f46' },
  attrInputBox: { width: 44, borderWidth: 1, borderColor: '#a1a1aa', fontWeight: 'bold', textAlign: 'center', fontSize: 12, paddingVertical: 2, borderRadius: 4, backgroundColor: '#f4f4f5', color: '#004424' },
  
  saveContainerBlock: { borderWidth: 1, borderColor: '#d4d4d8', padding: 8, borderRadius: 4, backgroundColor: '#ffffff', width: '100%' },
  saveTitleName: { fontSize: 11, fontWeight: 'bold', color: '#27272a' },
  
  weaponTypeHeader: { fontSize: 11, fontWeight: 'bold', textTransform: 'uppercase', color: '#004424' },
  addButton: { backgroundColor: '#004424', paddingHorizontal: 10, paddingVertical: 5, borderRadius: 4 },
  addButtonText: { color: '#ffffff', fontSize: 11, fontWeight: 'bold' },
  weaponAtkCardModifier: { backgroundColor: '#ffffff', padding: 10, borderWidth: 1, borderColor: '#b4b4b8', borderRadius: 6, flexDirection: 'column', marginTop: 4 },
  weaponInputNameEditable: { flex: 1, fontSize: 12, fontWeight: 'bold', color: '#4a1a12', borderWidth: 1, borderColor: '#e4e4e7', borderRadius: 4, paddingHorizontal: 6, paddingVertical: 2, backgroundColor: '#fafafa' },
  removeWeaponButton: { marginLeft: 8, paddingHorizontal: 8, justifyContent: 'center', alignItems: 'center', backgroundColor: '#991b1b', borderRadius: 4 },
  removeWeaponButtonText: { color: '#ffffff', fontSize: 11, fontWeight: 'bold' },
  computedAttackResult: { fontSize: 11, fontWeight: 'bold', color: '#27272a' },

  skillContainerCard: { backgroundColor: '#ffffff', padding: 8, borderWidth: 1, borderColor: '#d4d4d8', borderRadius: 4, flexDirection: 'column' },
  skillHeaderDivider: { justifyContent: 'space-between', alignItems: 'center' },
  skillMainName: { fontSize: 11, fontWeight: 'bold', color: '#004424' },
  skillAttrHint: { fontSize: 9, color: '#a1a1aa', fontWeight: 'normal' },
  skillTotalBadge: { width: 28, height: 22, backgroundColor: '#f4f4f5', borderWidth: 1, borderColor: '#004424', borderRadius: 4, justifyContent: 'center', alignItems: 'center' },
  skillTotalText: { fontSize: 11, fontWeight: 'bold', color: '#004424' },
  skillSubInputCell: { borderWidth: 1, borderColor: '#e4e4e7', borderRadius: 4, padding: 4, alignItems: 'center', backgroundColor: '#ffffff' },
  skillNumberInput: { width: '100%', textAlign: 'center', fontWeight: 'bold', fontSize: 11, color: '#3f3f46', borderWidth: 1, borderColor: '#d4d4d8', borderRadius: 4, paddingVertical: 2, backgroundColor: '#ffffff' },
  featsTextArea: { width: '100%', backgroundColor: '#fdfae6', borderWidth: 1, borderColor: '#e3dcb1', fontSize: 11, padding: 10, borderRadius: 4, minHeight: 140, color: '#2d1e10', textAlignVertical: 'top' }
});