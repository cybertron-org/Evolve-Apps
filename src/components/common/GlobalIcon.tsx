import React from 'react';
import { Text } from 'react-native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome'; 
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'; 
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6'; 
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import Octicons from 'react-native-vector-icons/Octicons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

interface IconProps {
  name: string;
  size?: any;
  color?: any;
  style?: any;
}

interface IconLibraries {
  [key: string]: React.ComponentType<IconProps>;
}

const iconLibraries: IconLibraries = {
  FontAwesome: FontAwesomeIcon,
  FontAwesome5: FontAwesome5,
  FontAwesome6: FontAwesome6,
  MaterialIcons: MaterialIcons,
  AntDesign: AntDesign,
  Fontisto: Fontisto,
  Feather: Feather,
  Entypo: Entypo,
  Ionicons: Ionicons,
  Octicons:Octicons,
  EvilIcons: EvilIcons,
  MaterialCommunityIcons: MaterialCommunityIcons 
};

const GlobalIcon: React.FC<IconProps & { library?: string }> = ({ library = 'FontAwesome', name, size = 24, color = 'black', ...props }) => {
  const SelectedIcon = iconLibraries[library]; 

  return <SelectedIcon name={name} size={size} color={color} {...props} />;
};

export default GlobalIcon;
