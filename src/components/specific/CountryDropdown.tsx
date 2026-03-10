import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  FlatList,
  TextInput,
} from 'react-native';
import { useTheme } from '../../theme/ThemeContext';
import worldCountries from 'world-countries';
import GlobalIcon from '../common/GlobalIcon';

export interface Country {
  name: string;
  code: string;
  dial_code: string;
  flag: string;
}

const COUNTRIES: Country[] = worldCountries
  .filter((c) => c.idd?.root)
  .map((c) => {
    const root = c.idd.root ?? '';
    const suffix = c.idd.suffixes?.[0] ?? '';
    return {
      name: c.name.common,
      code: c.cca2,
      dial_code: `${root}${suffix}`,
      flag: c.flag,
    };
  })
  .sort((a, b) => a.name.localeCompare(b.name));

interface Props {
  onSelect: (country: Country) => void;
  selectedCountry?: Country | null;
}

const CountryDropdown: React.FC<Props> = ({ onSelect, selectedCountry }) => {
  const { isDark } = useTheme();
  const [visible, setVisible] = useState(false);
  const [search, setSearch] = useState('');

  const filtered = useMemo(
    () =>
      COUNTRIES.filter((c) =>
        c.name.toLowerCase().includes(search.toLowerCase())
      ),
    [search]
  );

  const iconColor = isDark ? '#F1F5F9' : '#1E293B';
  const subIconColor = isDark ? '#94A3B8' : '#64748B';

  return (
    <>
      {/* ── Trigger Button ──────────────────────────────────────────────── */}
      <TouchableOpacity
        onPress={() => setVisible(true)}
        className={`
          flex-row items-center px-5 py-5 border rounded-md
          ${isDark
            ? 'bg-dropdown-dark border-dropdown-border-dark'
            : 'bg-white border-gray-200'}
        `}
      >
        {/* Flag or world icon */}
        {selectedCountry ? (
          <Text className="text-2xl">{selectedCountry.flag}</Text>
        ) : (
          <GlobalIcon
            library="Fontisto"
            name="world-o"
            size={21}
            color={iconColor}
          />
        )}

        {/* ✅ Country NAME show hoga — pehle dial_code tha */}
        <Text
          className={`ml-2 flex-1 text-sm font-medium ${
            selectedCountry
              ? isDark ? 'text-gray-100' : 'text-gray-800'
              : isDark ? 'text-gray-500' : 'text-gray-400'
          }`}
        >
          {selectedCountry?.name ?? 'Select Country'}
        </Text>

        <GlobalIcon
          library="Feather"
          name="chevron-down"
          size={14}
          color={subIconColor}
        />
      </TouchableOpacity>

      {/* ── Modal ───────────────────────────────────────────────────────── */}
      <Modal
        visible={visible}
        transparent
        animationType="slide"
        onRequestClose={() => setVisible(false)}
      >
        <View className="flex-1 justify-end" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <View
            className={`
              rounded-t-[20px] max-h-[75%] pb-8
              ${isDark ? 'bg-dropdown-dark' : 'bg-white'}
            `}
          >
            {/* Header */}
            <View className="flex-row justify-between items-center px-5 py-4">
              <Text className={`text-lg font-bold ${isDark ? 'text-gray-100' : 'text-gray-900'}`}>
                Select Country
              </Text>
              <TouchableOpacity
                onPress={() => { setVisible(false); setSearch(''); }}
                className="p-1"
              >
                <GlobalIcon
                  library="Feather"
                  name="x"
                  size={20}
                  color={subIconColor}
                />
              </TouchableOpacity>
            </View>

            {/* Search */}
            <View className="px-4 mb-3">
              <View className={`
                flex-row items-center rounded-xl px-3
                ${isDark ? 'bg-search-dark' : 'bg-gray-100'}
              `}>
                <GlobalIcon
                  library="Feather"
                  name="search"
                  size={16}
                  color={subIconColor}
                />
                <TextInput
                  value={search}
                  onChangeText={setSearch}
                  placeholder="Search country..."
                  placeholderTextColor={isDark ? '#94A3B8' : '#9CA3AF'}
                  className={`
                    flex-1 px-2 py-3 text-sm
                    ${isDark ? 'text-gray-100' : 'text-gray-900'}
                  `}
                />
              </View>
            </View>

            {/* List */}
            <FlatList
              data={filtered}
              keyExtractor={(item) => item.code}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => {
                    onSelect(item);
                    setVisible(false);
                    setSearch('');
                  }}
                  className={`
                    flex-row items-center px-5 py-3 border-b
                    ${isDark ? 'border-item-border-dark' : 'border-gray-100'}
                  `}
                >
                  <Text className="text-2xl">{item.flag}</Text>

                  <Text className={`ml-3 text-base flex-1 ${isDark ? 'text-gray-100' : 'text-gray-900'}`}>
                    {item.name}
                  </Text>

                  <Text className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                    {item.dial_code}
                  </Text>

                  <GlobalIcon
                    library="Feather"
                    name="chevron-right"
                    size={16}
                    color={subIconColor}
                  />
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </Modal>
    </>
  );
};

export default CountryDropdown;