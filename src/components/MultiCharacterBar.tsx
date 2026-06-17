import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { CharacterSheet } from '../types/character';
import { theme } from '../styles/theme';

interface MultiCharacterBarProps {
  characterList: CharacterSheet[];
  activeId: string;
  setActiveId: (id: string) => void;
  onAdd: () => void;
  onDelete: () => void;
}

export const MultiCharacterBar: React.FC<MultiCharacterBarProps> = React.memo(({ 
  characterList, activeId, setActiveId, onAdd, onDelete 
}) => {
  return (
    <View style={theme.multiCharacterBar}>
      <View style={theme.pickerManagerWrapper}>
        <Picker
          selectedValue={activeId}
          style={theme.pickerSelectorNativo}
          dropdownIconColor="#ffffff"
          onValueChange={(itemValue) => setActiveId(itemValue)}
        >
          {characterList.map((char) => (
            <Picker.Item key={char.id} label={char.name || "Sin Nombre"} value={char.id} />
          ))}
        </Picker>
      </View>
      <View style={theme.multiBarActionsGroup}>
        <TouchableOpacity style={theme.barButtonAdd} onPress={onAdd}>
          <Text style={theme.barButtonText}>+ Nuevo</Text>
        </TouchableOpacity>
        {characterList.length > 1 && (
          <TouchableOpacity style={theme.barButtonDelete} onPress={onDelete}>
            <Text style={theme.barButtonText}>✕ Borrar</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
});