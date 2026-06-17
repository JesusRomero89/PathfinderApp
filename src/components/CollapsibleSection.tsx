import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import { theme } from '../styles/theme';

interface CollapsibleSectionProps {
  title: string;
  isOpen: boolean;
  onPress: () => void;
  children: React.ReactNode;
}

export const CollapsibleSection: React.FC<CollapsibleSectionProps> = React.memo(({ title, isOpen, onPress, children }) => {
  return (
    <View style={{ width: '100%' }}>
      <TouchableOpacity style={theme.summary} onPress={onPress}>
        <Text style={theme.summaryText}>{title}</Text>
        <Text style={theme.summaryArrow}>{isOpen ? '▼' : '►'}</Text>
      </TouchableOpacity>
      {isOpen && <View style={theme.detailsBox}>{children}</View>}
    </View>
  );
});