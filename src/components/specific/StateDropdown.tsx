import AppText from '../common/AppText';
import React, { useState, useMemo } from 'react';
import {
  View,
  TouchableOpacity,
  Modal,
  FlatList,
  TextInput} from 'react-native';
import { useTheme } from '../../theme/ThemeContext';
import { State } from 'country-state-city';
import GlobalIcon from '../common/GlobalIcon';

export interface StateItem {
  name: string;
  code: string;
  countryCode: string;
}

interface Props {
  countryCode?: string | null;   // pass selected country's cca2 code
  onSelect: (state: StateItem) => void;
  selectedState?: StateItem | null;
}

const StateDropdown: React.FC<Props> = ({
  countryCode,
  onSelect,
  selectedState}) => {
  const { isDark } = useTheme();
  const [visible, setVisible] = useState(false);
  const [search, setSearch] = useState('');

  const iconColor    = isDark ? '#F1F5F9' : '#1E293B';
  const subIconColor = isDark ? '#94A3B8' : '#64748B';

  // Get all states for selected country
  const allStates: StateItem[] = useMemo(() => {
    if (!countryCode) return [];
    return State.getStatesOfCountry(countryCode).map((s) => ({
      name: s.name,
      code: s.isoCode,
      countryCode: s.countryCode}));
  }, [countryCode]);

  const filtered = useMemo(
    () =>
      allStates.filter((s) =>
        s.name.toLowerCase().includes(search.toLowerCase())
      ),
    [allStates, search]
  );

  const isDisabled = !countryCode;

  const handleOpen = () => {
    if (isDisabled) return;
    setSearch('');
    setVisible(true);
  };

  const handleClose = () => {
    setVisible(false);
  };

  return (
    <>
      {/* ── Trigger Button ──────────────────────────────────────────────── */}
      <TouchableOpacity
        onPress={handleOpen}
        activeOpacity={isDisabled ? 1 : 0.7}
        className={`
          flex-row items-center px-5 py-5 border rounded-md
          ${isDark
            ? 'bg-dropdown-dark border-dropdown-border-dark'
            : 'bg-white border-gray-200'}
          ${isDisabled ? 'opacity-50' : 'opacity-100'}
        `}
      >
        {/* Map pin icon */}
        <GlobalIcon
          library="Feather"
          name="map-pin"
          size={21}
          color={selectedState ? iconColor : subIconColor}
        />

        {/* Label */}
        <AppText
          className={`ml-2 flex-1 text-sm font-medium ${
            selectedState
              ? isDark ? 'text-gray-100' : 'text-gray-800'
              : isDark ? 'text-gray-500' : 'text-gray-400'
          }`}
        >
          {selectedState?.name ?? (isDisabled ? 'Select country first' : 'Select State')}
        </AppText>

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
        onRequestClose={handleClose}
      >
        <View
          className="flex-1 justify-end"
          style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
        >
          <View
            className={`
              rounded-t-[20px] max-h-[75%] pb-8
              ${isDark ? 'bg-dropdown-dark' : 'bg-white'}
            `}
          >
            {/* Header */}
            <View className="flex-row justify-between items-center px-5 py-4">
              <AppText
                className={`text-lg font-bold ${
                  isDark ? 'text-gray-100' : 'text-gray-900'
                }`}
              >
                Select State
              </AppText>

              <TouchableOpacity onPress={handleClose} className="p-1">
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
              <View
                className={`
                  flex-row items-center rounded-xl px-3
                  ${isDark ? 'bg-search-dark' : 'bg-gray-100'}
                `}
              >
                <GlobalIcon
                  library="Feather"
                  name="search"
                  size={16}
                  color={subIconColor}
                />
                <TextInput
                  value={search}
                  onChangeText={setSearch}
                  placeholder="Search state..."
                  placeholderTextColor={isDark ? '#94A3B8' : '#9CA3AF'}
                  className={`
                    flex-1 px-2 py-3 text-sm
                    ${isDark ? 'text-gray-100' : 'text-gray-900'}
                  `}
                />
              </View>
            </View>

            {/* Empty state */}
            {filtered.length === 0 && (
              <View className="items-center py-10">
                <GlobalIcon
                  library="Feather"
                  name="inbox"
                  size={32}
                  color={subIconColor}
                />
                <AppText
                  className={`mt-3 text-sm ${
                    isDark ? 'text-gray-400' : 'text-gray-500'
                  }`}
                >
                  No states found
                </AppText>
              </View>
            )}

            {/* List */}
            <FlatList
              data={filtered}
              keyExtractor={(item) => `${item.countryCode}-${item.code}`}
              initialNumToRender={20}
              maxToRenderPerBatch={20}
              windowSize={10}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => {
                    onSelect(item);
                    handleClose();
                  }}
                  className={`
                    flex-row items-center px-5 py-3 border-b
                    ${isDark ? 'border-item-border-dark' : 'border-gray-100'}
                  `}
                >
                  {/* State code badge */}
                  <View
                    className={`
                      w-9 h-9 rounded-full items-center justify-center mr-3
                      ${isDark ? 'bg-gray-700' : 'bg-gray-100'}
                    `}
                  >
                    <AppText
                      className={`text-xs font-bold ${
                        isDark ? 'text-gray-300' : 'text-gray-600'
                      }`}
                      numberOfLines={1}
                    >
                      {item.code.slice(0, 2)}
                    </AppText>
                  </View>

                  <AppText
                    className={`flex-1 text-base ${
                      isDark ? 'text-gray-100' : 'text-gray-900'
                    }`}
                  >
                    {item.name}
                  </AppText>

                  <AppText
                    className={`text-xs mr-2 ${
                      isDark ? 'text-gray-400' : 'text-gray-500'
                    }`}
                  >
                    {item.code}
                  </AppText>

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

export default StateDropdown;