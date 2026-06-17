import React, { useState, useEffect } from 'react';
import { 
  Text, 
  View, 
  TextInput, 
  ScrollView, 
  SafeAreaView, 
  TouchableOpacity, 
  ActivityIndicator,
  useWindowDimensions,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Inyección de Módulos Propios Separados
import { CharacterSheet, SkillData, SavingThrowData } from './src/types/character';
import { STORAGE_KEY, PROF_LABELS } from './src/constants/rules';
import { theme } from './src/styles/theme';
import { 
  createNewCharacter, 
  getProfBonus, 
  calculateAC 
} from './src/utils/formulas';

// Componentes Limpios Extraídos
import { MultiCharacterBar } from './src/components/MultiCharacterBar';
import { CollapsibleSection } from './src/components/CollapsibleSection';

export default function App() {
  const [characterList, setCharacterList] = useState<CharacterSheet[]>([]);
  const [activeId, setActiveId] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const { width } = useWindowDimensions();

  // Estados de control para secciones colapsables (Acordeones)
  const [openBio, setOpenBio] = useState(true);
  const [openAttr, setOpenAttr] = useState(false);
  const [openSaves, setOpenSaves] = useState(false);
  const [openAttacks, setOpenAttacks] = useState(true);
  const [openSkills, setOpenSkills] = useState(false);
  const [openFeats, setOpenFeats] = useState(false);

  useEffect(() => {
    const loadAllCharacters = async () => {
      try {
        const savedData = await AsyncStorage.getItem(STORAGE_KEY);
        if (savedData !== null) {
          const list: CharacterSheet[] = JSON.parse(savedData);
          setCharacterList(list);
          if (list.length > 0) setActiveId(list[0].id);
        } else {
          // Si el almacenamiento local está vacío, inicializa una sola hoja 100% limpia
          const freshCharacter = createNewCharacter("Mi Primer Héroe");
          const initialList = [freshCharacter];
          
          setCharacterList(initialList);
          setActiveId(freshCharacter.id);
          await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(initialList));
        }
      } catch (error) {
        console.error("Error al leer el disco nativo:", error);
      } finally {
        setLoading(false);
      }
    };
    loadAllCharacters();
  }, []);

  const character = characterList.find(c => c.id === activeId) || characterList[0];

  const saveAllData = async (updatedList: CharacterSheet[]) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedList));
    } catch (error) {
      console.error("Error al escribir en el disco nativo:", error);
    }
  };

  const updateCharacterInList = (updatedChar: CharacterSheet) => {
    const updatedList = characterList.map(c => c.id === updatedChar.id ? updatedChar : c);
    setCharacterList(updatedList);
    saveAllData(updatedList);
  };

  const addNewCharacterSheet = () => {
    const newChar = createNewCharacter();
    const updatedList = [...characterList, newChar];
    setCharacterList(updatedList);
    setActiveId(newChar.id);
    saveAllData(updatedList);
  };

  const deleteActiveCharacterSheet = () => {
    if (characterList.length <= 1) return;
    const updatedList = characterList.filter(c => c.id !== activeId);
    setCharacterList(updatedList);
    setActiveId(updatedList[0].id);
    saveAllData(updatedList);
  };

  const updateField = (field: keyof CharacterSheet, value: any) => {
    const parsedValue = typeof character[field] === 'number' ? parseInt(value) || 0 : value;
    const updatedCharacter = { ...character, [field]: parsedValue };
    updateCharacterInList(updatedCharacter);
  };

  const handleHeroPoints = (point: number) => {
    let newPoints = point;
    if (character.heroPoints === point) {
      newPoints = point - 1; 
    }
    updateField('heroPoints', newPoints);
  };

  const updateSkill = (skillKey: keyof CharacterSheet, subField: keyof SkillData, value: any) => {
    const currentSkill = character[skillKey] as SkillData;
    const parsedValue = subField === 'prof' ? value : (parseInt(value) || 0);
    const updatedCharacter = {
      ...character,
      [skillKey]: { ...currentSkill, [subField]: parsedValue }
    };
    updateCharacterInList(updatedCharacter);
  };

  const updateSave = (saveKey: 'fortitude' | 'reflexes' | 'will', subField: keyof SavingThrowData, value: any) => {
    const currentSave = character[saveKey];
    const parsedValue = subField === 'prof' ? value : (parseInt(value) || 0);
    const updatedCharacter = {
      ...character,
      [saveKey]: { ...currentSave, [subField]: parsedValue }
    };
    updateCharacterInList(updatedCharacter);
  };

  const addMeleeAttack = () => {
    const newAttack = {
      weapon: "Nueva Arma / Ataque", attrType: "FUE" as const, prof: "trained" as const,
      item: 0, diceCount: 1, diceSize: "d6", specDamage: 0
    };
    const updatedCharacter = { ...character, meleeAttacks: [...character.meleeAttacks, newAttack] };
    updateCharacterInList(updatedCharacter);
  };

  const updateAttack = (index: number, subField: any, value: any) => {
    const updatedAttacks = [...character.meleeAttacks];
    let parsedValue = value;
    if (subField === 'item' || subField === 'diceCount' || subField === 'specDamage') {
      parsedValue = parseInt(value) || 0;
    }
    updatedAttacks[index] = { ...updatedAttacks[index], [subField]: parsedValue };
    updateCharacterInList({ ...character, meleeAttacks: updatedAttacks });
  };

  const removeAttack = (index: number) => {
    updateCharacterInList({
      ...character,
      meleeAttacks: character.meleeAttacks.filter((_, i) => i !== index)
    });
  };

  if (loading || !character) {
    return (
      <SafeAreaView style={[theme.container, theme.center]}>
        <ActivityIndicator size="large" color="#004424" />
        <Text style={theme.loadingText}>Sincronizando Crónicas Múltiples...</Text>
      </SafeAreaView>
    );
  }

  const skillsList: { name: string; field: keyof CharacterSheet; attrName: string; attrVal: number }[] = [
    { name: 'Acrobacias', field: 'acrobatics', attrName: 'DES', attrVal: character.dexterity },
    { name: 'Arcanismo', field: 'arcana', attrName: 'INT', attrVal: character.intelligence },
    { name: 'Atletismo', field: 'athletics', attrName: 'FUE', attrVal: character.strength },
    { name: 'Diplomacia', field: 'diplomacy', attrName: 'CAR', attrVal: character.charisma },
    { name: 'Disimulo', field: 'deception', attrName: 'CAR', attrVal: character.charisma },
    { name: 'Furtividad', field: 'stealth', attrName: 'DES', attrVal: character.dexterity },
    { name: 'Intimidación', field: 'intimidation', attrName: 'CAR', attrVal: character.charisma },
    { name: 'Latrocinio', field: 'thievery', attrName: 'DES', attrVal: character.dexterity },
    { name: 'Manufactura', field: 'crafting', attrName: 'INT', attrVal: character.intelligence },
    { name: 'Medicina', field: 'medicine', attrName: 'SAB', attrVal: character.wisdom },
    { name: 'Naturaleza', field: 'nature', attrName: 'SAB', attrVal: character.wisdom },
    { name: 'Ocultismo', field: 'occultism', attrName: 'INT', attrVal: character.intelligence },
    { name: 'Performance', field: 'performance', attrName: 'CAR', attrVal: character.charisma },
    { name: 'Religión', field: 'religion', attrName: 'SAB', attrVal: character.wisdom },
    { name: 'Sociedad', field: 'society', attrName: 'INT', attrVal: character.intelligence },
    { name: 'Supervivencia', field: 'survival', attrName: 'SAB', attrVal: character.wisdom },
  ];

  return (
    <SafeAreaView style={theme.container}>
      <MultiCharacterBar 
        characterList={characterList}
        activeId={activeId}
        setActiveId={setActiveId}
        onAdd={addNewCharacterSheet}
        onDelete={deleteActiveCharacterSheet}
      />

      <KeyboardAvoidingView 
        style={{ flex: 1 }} 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
      >
        <ScrollView contentContainerStyle={[theme.scrollContainer, { width: width }]} keyboardShouldPersistTaps="handled">
          
          <View style={theme.header}>
            <Text style={theme.headerTitle}>PATHFINDER</Text>
            <View style={theme.headerSubtitleContainer}>
              <Text style={theme.headerSubtitle}>Ficha Móvil Modular</Text>
            </View>
          </View>

          {/* ACORDEÓN 1: IDENTIDAD */}
          <CollapsibleSection title="Identidad y Biografía" isOpen={openBio} onPress={() => setOpenBio(!openBio)}>
            <View style={theme.verticalField}>
              <Text style={theme.fieldLabelPrimary}>Nombre del Personaje</Text>
              <TextInput style={theme.inputBold} value={character.name} onChangeText={(text) => updateField('name', text)} />
            </View>
            <View style={theme.verticalField}>
              <Text style={theme.fieldLabel}>Clase y Senda</Text>
              <TextInput style={theme.input} value={character.className} onChangeText={(text) => updateField('className', text)} />
            </View>
            <View style={theme.verticalField}>
              <Text style={theme.fieldLabel}>Ancestralidad</Text>
              <TextInput style={theme.input} value={character.ancestrality} onChangeText={(text) => updateField('ancestrality', text)} />
            </View>
            <View style={theme.verticalField}>
              <Text style={theme.fieldLabel}>Herencia</Text>
              <TextInput style={theme.input} value={character.heritage} onChangeText={(text) => updateField('heritage', text)} />
            </View>
            <View style={theme.rowLayout}>
              <View style={[theme.verticalField, { flex: 1, marginRight: 6 }]}>
                <Text style={theme.fieldLabel}>Nivel</Text>
                <TextInput style={theme.inputCenterBold} keyboardType="numeric" value={character.level.toString()} onChangeText={(text) => updateField('level', text)} />
              </View>
              <View style={[theme.verticalField, { flex: 1, marginLeft: 6 }]}>
                <Text style={theme.fieldLabel}>Tamaño</Text>
                <TextInput style={theme.inputCenter} value={character.size} onChangeText={(text) => updateField('size', text)} />
              </View>
            </View>
            <View style={theme.heroPointsContainer}>
              <Text style={theme.fieldLabelPrimary}>Puntos Heroicos</Text>
              <View style={theme.rowLayout}>
                {[1, 2, 3].map((i) => (
                  <TouchableOpacity key={i} onPress={() => handleHeroPoints(i)} style={[theme.heroButton, character.heroPoints >= i ? theme.heroButtonActive : theme.heroButtonInactive]}>
                    <Text style={character.heroPoints >= i ? theme.heroTextActive : theme.heroTextInactive}>{i}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </CollapsibleSection>

          {/* PANEL DE COMBATE (FIJO PARA CONSULTA RÁPIDA) */}
          <View style={theme.combateCard}>
            <View style={theme.rowLayout}>
              <View style={[theme.quickStatBox, { marginRight: 4 }]}>
                <Text style={theme.quickStatLabelPrimary}>CA</Text>
                <Text style={theme.quickStatValuePrimary}>{calculateAC(character)}</Text>
              </View>
              <View style={[theme.quickStatBox, { marginHorizontal: 4 }]}>
                <Text style={theme.quickStatLabel}>Vida Actual</Text>
                <TextInput style={theme.hpInput} keyboardType="numeric" value={character.hpCurrent.toString()} onChangeText={(text) => updateField('hpCurrent', text)} />
              </View>
              <View style={[theme.quickStatBox, { marginLeft: 4 }]}>
                <Text style={theme.quickStatLabel}>Velocidad</Text>
                <View style={theme.speedRow}>
                  <TextInput style={theme.speedInput} keyboardType="numeric" value={character.speed.toString()} onChangeText={(text) => updateField('speed', text)} />
                  <Text style={theme.unitText}>m</Text>
                </View>
              </View>
            </View>

            <View style={theme.hpManagerBox}>
              <Text style={theme.subBoxLabel}>Puntos de Golpe Máximos</Text>
              <TextInput style={theme.inputCenterBoldText} keyboardType="numeric" value={character.hpMax.toString()} onChangeText={(text) => updateField('hpMax', text)} />
              <View style={theme.statesRow}>
                <View style={theme.stateCell}>
                  <Text style={theme.stateLabelDying}>Moribundo</Text>
                  <TextInput style={theme.stateInputDying} keyboardType="numeric" value={character.dying.toString()} onChangeText={(text) => updateField('dying', text)} />
                </View>
                <View style={theme.stateCell}>
                  <Text style={theme.stateLabelWounded}>Herido</Text>
                  <TextInput style={theme.stateInputWounded} keyboardType="numeric" value={character.wounded.toString()} onChangeText={(text) => updateField('wounded', text)} />
                </View>
              </View>
            </View>

            <View style={theme.perceptionContainerIndependent}>
              <Text style={theme.quickStatLabelPrimary}>Percepción</Text>
              <View style={[theme.rowLayout, { alignItems: 'center', marginTop: 4 }]}>
                <View style={theme.selectorRowGroup}>
                  {PROF_LABELS.map((p) => (
                    <TouchableOpacity key={p.value} onPress={() => updateField('perceptionProf', p.value)} style={[theme.selectorButtonState, character.perceptionProf === p.value ? theme.selectorButtonActive : theme.selectorButtonInactive]}>
                      <Text style={character.perceptionProf === p.value ? theme.selectorTextActive : theme.selectorTextInactive}>{p.label}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
                <View style={theme.modBadge}>
                  <Text style={theme.modBadgeText}>+{character.wisdom + getProfBonus(character.perceptionProf, character.level) + character.perceptionItem}</Text>
                </View>
              </View>
            </View>
          </View>

          {/* ACORDEÓN 2: ATRIBUTOS PRIMARIOS */}
          <CollapsibleSection title="Atributos Primarios" isOpen={openAttr} onPress={() => setOpenAttr(!openAttr)}>
            {[
              { label: 'Fuerza (FUE)', field: 'strength' },
              { label: 'Destreza (DES)', field: 'dexterity' },
              { label: 'Constitución (CON)', field: 'constitution' },
              { label: 'Inteligencia (INT)', field: 'intelligence' },
              { label: 'Sabiduría (SAB)', field: 'wisdom' },
              { label: 'Carisma (CAR)', field: 'charisma' },
            ].map((attr) => (
              <View key={attr.field} style={theme.attrRowIndependent}>
                <Text style={theme.attrLabelText}>{attr.label}</Text>
                <TextInput style={theme.attrInputBox} keyboardType="numeric" value={character[attr.field as keyof CharacterSheet].toString()} onChangeText={(text) => updateField(attr.field as keyof CharacterSheet, text)} />
              </View>
            ))}
          </CollapsibleSection>

          {/* ACORDEÓN 3: SALVACIONES */}
          <CollapsibleSection title="Defensas de Salvación" isOpen={openSaves} onPress={() => setOpenSaves(!openSaves)}>
            {[
              { name: 'Fortaleza (CON)', field: 'fortitude', attrVal: character.constitution },
              { name: 'Reflejos (DES)', field: 'reflexes', attrVal: character.dexterity },
              { name: 'Voluntad (SAB)', field: 'will', attrVal: character.wisdom },
            ].map((save) => {
              const saveData = character[save.field as 'fortitude' | 'reflexes' | 'will'];
              const totalSave = save.attrVal + getProfBonus(saveData.prof, character.level) + saveData.item;
              return (
                <View key={save.field} style={theme.saveContainerBlock}>
                  <Text style={theme.saveTitleName}>{save.name}</Text>
                  <View style={[theme.rowLayout, { alignItems: 'center', marginTop: 4 }]}>
                    <View style={theme.selectorRowGroup}>
                      {PROF_LABELS.map((p) => (
                        <TouchableOpacity key={p.value} onPress={() => updateSave(save.field as any, 'prof', p.value)} style={[theme.selectorButtonState, saveData.prof === p.value ? theme.selectorButtonActive : theme.selectorButtonInactive]}>
                          <Text style={saveData.prof === p.value ? theme.selectorTextActive : theme.selectorTextInactive}>{p.label}</Text>
                        </TouchableOpacity>
                      ))}
                    </View>
                    <View style={theme.modBadge}>
                      <Text style={theme.modBadgeText}>{totalSave >= 0 ? `+${totalSave}` : totalSave}</Text>
                    </View>
                  </View>
                </View>
              );
            })}
          </CollapsibleSection>

          {/* ACORDEÓN 4: GOLPES Y ARMAS */}
          <CollapsibleSection title="Golpes y Armas Múltiples" isOpen={openAttacks} onPress={() => setOpenAttacks(!openAttacks)}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
              <Text style={theme.weaponTypeHeader}>Cuerpo a Cuerpo</Text>
              <TouchableOpacity style={theme.addButton} onPress={addMeleeAttack}>
                <Text style={theme.addButtonText}>+ Añadir Arma</Text>
              </TouchableOpacity>
            </View>
            {character.meleeAttacks.map((attack, index) => {
              const modifierAttr = attack.attrType === 'FUE' ? character.strength : character.dexterity;
              const atkBonus = modifierAttr + getProfBonus(attack.prof, character.level) + attack.item;
              return (
                <View key={index} style={theme.weaponAtkCardModifier}>
                  <View style={theme.rowLayout}>
                    <TextInput style={theme.weaponInputNameEditable} value={attack.weapon} onChangeText={(t) => updateAttack(index, 'weapon', t)} />
                    <TouchableOpacity style={theme.removeWeaponButton} onPress={() => removeAttack(index)}><Text style={theme.removeWeaponButtonText}>✕</Text></TouchableOpacity>
                  </View>
                  <View style={[theme.rowLayout, { marginTop: 6, gap: 6, alignItems: 'center' }]}>
                    <View style={{ flex: 1.5 }}>
                      <View style={theme.selectorRowGroupSmall}>
                        {PROF_LABELS.map((p) => (
                          <TouchableOpacity key={p.value} onPress={() => updateAttack(index, 'prof', p.value)} style={[theme.selectorButtonStateSmall, attack.prof === p.value ? theme.selectorButtonActive : theme.selectorButtonInactive]}>
                            <Text style={attack.prof === p.value ? theme.selectorTextActiveSmall : theme.selectorTextInactiveSmall}>{p.label}</Text>
                          </TouchableOpacity>
                        ))}
                      </View>
                    </View>
                    <View style={{ flex: 0.8 }}><TextInput style={theme.inputCenter} keyboardType="numeric" value={attack.diceCount.toString()} onChangeText={(t) => updateAttack(index, 'diceCount', t)} /></View>
                    <View style={{ flex: 0.8 }}><TextInput style={theme.inputCenter} value={attack.diceSize} onChangeText={(t) => updateAttack(index, 'diceSize', t)} /></View>
                    <View style={{ flex: 0.8 }}><TextInput style={theme.inputCenter} keyboardType="numeric" value={attack.specDamage.toString()} onChangeText={(t) => updateAttack(index, 'specDamage', t)} /></View>
                  </View>
                  <View style={[theme.rowLayout, { marginTop: 8, justifyContent: 'space-between', borderTopWidth: 1, borderTopColor: '#f4f4f5', paddingTop: 4 }]}>
                    <Text style={theme.computedAttackResult}>Total Ataque: <Text style={{ color: '#004424' }}>+{atkBonus}</Text></Text>
                    <Text style={theme.computedAttackResult}>Total Daño: <Text style={{ color: '#a62b17' }}>{attack.diceCount}{attack.diceSize} + {character.strength + attack.specDamage}</Text></Text>
                  </View>
                </View>
              );
            })}
          </CollapsibleSection>

          {/* ACORDEÓN 5: PERICIAS Y HABILIDADES */}
          <CollapsibleSection title="Pericias y Habilidades" isOpen={openSkills} onPress={() => setOpenSkills(!openSkills)}>
            {skillsList.map((skill) => {
              const skillData = character[skill.field] as SkillData;
              const total = skill.attrVal + getProfBonus(skillData.prof, character.level) + skillData.item - skillData.armorPen;
              return (
                <View key={skill.field} style={theme.skillContainerCard}>
                  <View style={[theme.rowLayout, theme.skillHeaderDivider]}>
                    <Text style={theme.skillMainName}>{skill.name} <Text style={theme.skillAttrHint}>({skill.attrName})</Text></Text>
                    <View style={theme.skillTotalBadge}><Text style={theme.skillTotalText}>{total >= 0 ? `+${total}` : total}</Text></View>
                  </View>
                  <View style={[theme.rowLayout, { alignItems: 'center', marginTop: 4 }]}>
                    <View style={[theme.selectorRowGroup, { flex: 1, marginRight: 6 }]}>
                      {PROF_LABELS.map((p) => (
                        <TouchableOpacity key={p.value} onPress={() => updateSkill(skill.field, 'prof', p.value)} style={[theme.selectorButtonStateSmall, skillData.prof === p.value ? theme.selectorButtonActive : theme.selectorButtonInactive]}>
                          <Text style={skillData.prof === p.value ? theme.selectorTextActiveSmall : theme.selectorTextInactiveSmall}>{p.label}</Text>
                        </TouchableOpacity>
                      ))}
                    </View>
                    <View style={{ width: 40, marginRight: 4 }}><TextInput style={theme.skillNumberInput} keyboardType="numeric" value={skillData.item.toString()} onChangeText={(t) => updateSkill(skill.field, 'item', t)} placeholder="Itm" /></View>
                    <View style={{ width: 40 }}><TextInput style={[theme.skillNumberInput, { color: '#a62b17' }]} keyboardType="numeric" value={skillData.armorPen.toString()} onChangeText={(t) => updateSkill(skill.field, 'armorPen', t)} placeholder="Pen" /></View>
                  </View>
                </View>
              );
            })}
          </CollapsibleSection>

          {/* ACORDEÓN 6: CÓDICE DE TALENTOS */}
          <CollapsibleSection title="Códice de Talentos" isOpen={openFeats} onPress={() => setOpenFeats(!openFeats)}>
            <TextInput style={theme.featsTextArea} multiline value={character.featsText} onChangeText={(text) => updateField('featsText', text)} underlineColorAndroid="transparent" />
          </CollapsibleSection>

          {/* Colchón de holgura táctica para el scroll del teclado */}
          <View style={{ height: 60 }} />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}