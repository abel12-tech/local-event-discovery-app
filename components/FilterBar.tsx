import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Modal,
} from 'react-native';
import { ListFilter as FilterIcon, X } from 'lucide-react-native';
import { Filter, EventCategory } from '@/types';
import { useApp } from '@/contexts/AppContext';

const categories: (EventCategory | 'All')[] = [
  'All',
  'Music',
  'Tech',
  'Business',
  'Sports',
  'Education',
  'Food',
  'Art',
  'Social',
];

const dateRanges = ['All', 'Today', 'This Week', 'This Month'] as const;
const priceTypes = ['All', 'Free', 'Paid'] as const;

export default function FilterBar() {
  const { filter, setFilter } = useApp();
  const [showModal, setShowModal] = useState(false);

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      All: '#6B7280',
      Music: '#EC4899',
      Tech: '#3B82F6',
      Business: '#8B5CF6',
      Sports: '#EF4444',
      Education: '#F59E0B',
      Food: '#10B981',
      Art: '#F97316',
      Social: '#06B6D4',
    };
    return colors[category] || '#6B7280';
  };

  return (
    <>
      <View style={styles.container}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}>
          {categories.map((category) => (
            <TouchableOpacity
              key={category}
              style={[
                styles.chip,
                filter.category === category && styles.chipActive,
                {
                  borderColor: getCategoryColor(category),
                  backgroundColor:
                    filter.category === category
                      ? getCategoryColor(category)
                      : '#FFFFFF',
                },
              ]}
              onPress={() => setFilter({ ...filter, category })}>
              <Text
                style={[
                  styles.chipText,
                  filter.category === category && styles.chipTextActive,
                ]}>
                {category}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => setShowModal(true)}>
          <FilterIcon size={20} color="#3B82F6" />
        </TouchableOpacity>
      </View>

      <Modal
        visible={showModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowModal(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Filter Events</Text>
              <TouchableOpacity onPress={() => setShowModal(false)}>
                <X size={24} color="#111827" />
              </TouchableOpacity>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Date Range</Text>
              <View style={styles.optionsRow}>
                {dateRanges.map((range) => (
                  <TouchableOpacity
                    key={range}
                    style={[
                      styles.option,
                      filter.dateRange === range && styles.optionActive,
                    ]}
                    onPress={() => setFilter({ ...filter, dateRange: range })}>
                    <Text
                      style={[
                        styles.optionText,
                        filter.dateRange === range && styles.optionTextActive,
                      ]}>
                      {range}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Price</Text>
              <View style={styles.optionsRow}>
                {priceTypes.map((type) => (
                  <TouchableOpacity
                    key={type}
                    style={[
                      styles.option,
                      filter.priceType === type && styles.optionActive,
                    ]}
                    onPress={() => setFilter({ ...filter, priceType: type })}>
                    <Text
                      style={[
                        styles.optionText,
                        filter.priceType === type && styles.optionTextActive,
                      ]}>
                      {type}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <TouchableOpacity
              style={styles.applyButton}
              onPress={() => setShowModal(false)}>
              <Text style={styles.applyButtonText}>Apply Filters</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  scrollContent: {
    paddingHorizontal: 16,
    gap: 8,
  },
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1.5,
    marginRight: 8,
  },
  chipActive: {
    borderWidth: 0,
  },
  chipText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6B7280',
  },
  chipTextActive: {
    color: '#FFFFFF',
  },
  filterButton: {
    paddingRight: 16,
    paddingLeft: 8,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    paddingBottom: 40,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#111827',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 12,
  },
  optionsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  option: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
    backgroundColor: '#F3F4F6',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  optionActive: {
    backgroundColor: '#3B82F6',
    borderColor: '#3B82F6',
  },
  optionText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6B7280',
  },
  optionTextActive: {
    color: '#FFFFFF',
  },
  applyButton: {
    backgroundColor: '#3B82F6',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  applyButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
});
