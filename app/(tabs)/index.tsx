import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Modal,
  ScrollView,
  Image,
} from 'react-native';
import { Search, X, MapPin, Calendar, Clock, Users } from 'lucide-react-native';
import { useApp } from '@/contexts/AppContext';
import EventCard from '@/components/EventCard';
import FilterBar from '@/components/FilterBar';
import { Event } from '@/types';

export default function DiscoverScreen() {
  const { events, filter, registeredEvents, toggleRegistration } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  const filteredEvents = useMemo(() => {
    return events.filter((event) => {
      const matchesSearch =
        event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.location.address
          .toLowerCase()
          .includes(searchQuery.toLowerCase());

      const matchesCategory =
        filter.category === 'All' || event.category === filter.category;

      const matchesPrice =
        filter.priceType === 'All' ||
        (filter.priceType === 'Free' && event.price === 0) ||
        (filter.priceType === 'Paid' && event.price > 0);

      const eventDate = new Date(event.date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      let matchesDate = true;
      if (filter.dateRange === 'Today') {
        matchesDate = eventDate.toDateString() === today.toDateString();
      } else if (filter.dateRange === 'This Week') {
        const weekFromNow = new Date(today);
        weekFromNow.setDate(today.getDate() + 7);
        matchesDate = eventDate >= today && eventDate <= weekFromNow;
      } else if (filter.dateRange === 'This Month') {
        const monthFromNow = new Date(today);
        monthFromNow.setMonth(today.getMonth() + 1);
        matchesDate = eventDate >= today && eventDate <= monthFromNow;
      }

      return matchesSearch && matchesCategory && matchesPrice && matchesDate;
    });
  }, [events, searchQuery, filter]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const isRegistered = selectedEvent
    ? registeredEvents.includes(selectedEvent.id)
    : false;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Discover Events</Text>
        <Text style={styles.headerSubtitle}>Find amazing events near you</Text>
      </View>

      <View style={styles.searchContainer}>
        <Search size={20} color="#9CA3AF" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search events..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholderTextColor="#9CA3AF"
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={() => setSearchQuery('')}>
            <X size={20} color="#9CA3AF" />
          </TouchableOpacity>
        )}
      </View>

      <FilterBar />

      <FlatList
        data={filteredEvents}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <EventCard event={item} onPress={() => setSelectedEvent(item)} />
        )}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>No events found</Text>
            <Text style={styles.emptySubtext}>
              Try adjusting your filters
            </Text>
          </View>
        }
      />

      <Modal
        visible={selectedEvent !== null}
        animationType="slide"
        onRequestClose={() => setSelectedEvent(null)}>
        {selectedEvent && (
          <SafeAreaView style={styles.modalContainer}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={styles.modalImageContainer}>
                <Image
                  source={{ uri: selectedEvent.imageUrl }}
                  style={styles.modalImage}
                />
                <TouchableOpacity
                  style={styles.closeButton}
                  onPress={() => setSelectedEvent(null)}>
                  <X size={24} color="#FFFFFF" />
                </TouchableOpacity>
                <View style={styles.modalCategoryBadge}>
                  <Text style={styles.modalCategoryText}>
                    {selectedEvent.category}
                  </Text>
                </View>
              </View>

              <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>{selectedEvent.title}</Text>

                <View style={styles.organizerContainer}>
                  <Image
                    source={{ uri: selectedEvent.organizer.avatar }}
                    style={styles.organizerAvatar}
                  />
                  <View>
                    <Text style={styles.organizerLabel}>Organized by</Text>
                    <Text style={styles.organizerName}>
                      {selectedEvent.organizer.name}
                    </Text>
                  </View>
                </View>

                <View style={styles.detailsContainer}>
                  <View style={styles.detailRow}>
                    <View style={styles.detailIcon}>
                      <Calendar size={20} color="#3B82F6" />
                    </View>
                    <View>
                      <Text style={styles.detailLabel}>Date</Text>
                      <Text style={styles.detailValue}>
                        {formatDate(selectedEvent.date)}
                      </Text>
                    </View>
                  </View>

                  <View style={styles.detailRow}>
                    <View style={styles.detailIcon}>
                      <Clock size={20} color="#3B82F6" />
                    </View>
                    <View>
                      <Text style={styles.detailLabel}>Time</Text>
                      <Text style={styles.detailValue}>
                        {selectedEvent.time}
                      </Text>
                    </View>
                  </View>

                  <View style={styles.detailRow}>
                    <View style={styles.detailIcon}>
                      <MapPin size={20} color="#3B82F6" />
                    </View>
                    <View style={{ flex: 1 }}>
                      <Text style={styles.detailLabel}>Location</Text>
                      <Text style={styles.detailValue}>
                        {selectedEvent.location.address}
                      </Text>
                    </View>
                  </View>

                  <View style={styles.detailRow}>
                    <View style={styles.detailIcon}>
                      <Users size={20} color="#3B82F6" />
                    </View>
                    <View>
                      <Text style={styles.detailLabel}>Attendees</Text>
                      <Text style={styles.detailValue}>
                        {selectedEvent.attendees} / {selectedEvent.maxAttendees}
                      </Text>
                    </View>
                  </View>
                </View>

                <View style={styles.descriptionContainer}>
                  <Text style={styles.descriptionTitle}>About this event</Text>
                  <Text style={styles.descriptionText}>
                    {selectedEvent.description}
                  </Text>
                </View>

                <View style={styles.priceContainer}>
                  <Text style={styles.priceLabel}>Price</Text>
                  {selectedEvent.price === 0 ? (
                    <Text style={styles.priceValueFree}>Free</Text>
                  ) : (
                    <Text style={styles.priceValue}>${selectedEvent.price}</Text>
                  )}
                </View>
              </View>
            </ScrollView>

            <View style={styles.registerButtonContainer}>
              <TouchableOpacity
                style={[
                  styles.registerButton,
                  isRegistered && styles.registeredButton,
                ]}
                onPress={() => {
                  toggleRegistration(selectedEvent.id);
                  setSelectedEvent(null);
                }}>
                <Text style={styles.registerButtonText}>
                  {isRegistered ? 'Cancel Registration' : 'Register Now'}
                </Text>
              </TouchableOpacity>
            </View>
          </SafeAreaView>
        )}
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    padding: 16,
    paddingTop: 8,
    backgroundColor: '#FFFFFF',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#6B7280',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginVertical: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#111827',
  },
  listContent: {
    padding: 16,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#6B7280',
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#9CA3AF',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  modalImageContainer: {
    position: 'relative',
    width: '100%',
    height: 300,
  },
  modalImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  closeButton: {
    position: 'absolute',
    top: 48,
    right: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalCategoryBadge: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    backgroundColor: '#3B82F6',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  modalCategoryText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  modalContent: {
    padding: 20,
  },
  modalTitle: {
    fontSize: 26,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 16,
  },
  organizerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  organizerAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 12,
  },
  organizerLabel: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 2,
  },
  organizerName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  detailsContainer: {
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  detailIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#EFF6FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  detailLabel: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 4,
  },
  detailValue: {
    fontSize: 15,
    fontWeight: '600',
    color: '#111827',
  },
  descriptionContainer: {
    marginBottom: 24,
  },
  descriptionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 12,
  },
  descriptionText: {
    fontSize: 15,
    color: '#4B5563',
    lineHeight: 24,
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  priceLabel: {
    fontSize: 16,
    color: '#6B7280',
  },
  priceValue: {
    fontSize: 24,
    fontWeight: '700',
    color: '#10B981',
  },
  priceValueFree: {
    fontSize: 24,
    fontWeight: '700',
    color: '#10B981',
  },
  registerButtonContainer: {
    padding: 16,
    paddingBottom: 24,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  registerButton: {
    backgroundColor: '#3B82F6',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  registeredButton: {
    backgroundColor: '#EF4444',
  },
  registerButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
});
