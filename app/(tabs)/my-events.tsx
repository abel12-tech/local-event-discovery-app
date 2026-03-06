import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  SafeAreaView,
  Modal,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import { Calendar, X, MapPin, Clock, Users, CircleCheck as CheckCircle } from 'lucide-react-native';
import { useApp } from '@/contexts/AppContext';
import EventCard from '@/components/EventCard';
import { Event } from '@/types';

export default function MyEventsScreen() {
  const { events, registeredEvents, toggleRegistration } = useApp();
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  const myEvents = events.filter((event) =>
    registeredEvents.includes(event.id)
  );

  const upcomingEvents = myEvents.filter(
    (event) => new Date(event.date) >= new Date()
  );
  const pastEvents = myEvents.filter(
    (event) => new Date(event.date) < new Date()
  );

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
        <View style={styles.headerTitleContainer}>
          <Calendar size={28} color="#3B82F6" />
          <Text style={styles.headerTitle}>My Events</Text>
        </View>
        <Text style={styles.headerSubtitle}>
          {myEvents.length} {myEvents.length === 1 ? 'event' : 'events'}{' '}
          registered
        </Text>
      </View>

      <FlatList
        data={myEvents}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <EventCard event={item} onPress={() => setSelectedEvent(item)} />
        )}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          myEvents.length > 0 ? (
            <View style={styles.statsContainer}>
              <View style={styles.statCard}>
                <Text style={styles.statNumber}>{upcomingEvents.length}</Text>
                <Text style={styles.statLabel}>Upcoming</Text>
              </View>
              <View style={styles.statCard}>
                <Text style={styles.statNumber}>{pastEvents.length}</Text>
                <Text style={styles.statLabel}>Attended</Text>
              </View>
              <View style={styles.statCard}>
                <Text style={styles.statNumber}>{myEvents.length}</Text>
                <Text style={styles.statLabel}>Total</Text>
              </View>
            </View>
          ) : null
        }
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Calendar size={64} color="#E5E7EB" />
            <Text style={styles.emptyText}>No events registered</Text>
            <Text style={styles.emptySubtext}>
              Browse events and register to get started
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
                {isRegistered && (
                  <View style={styles.registeredBadge}>
                    <CheckCircle size={16} color="#FFFFFF" />
                    <Text style={styles.registeredBadgeText}>Registered</Text>
                  </View>
                )}
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
  headerTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 4,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#111827',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#6B7280',
    marginLeft: 40,
  },
  statsContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  statNumber: {
    fontSize: 28,
    fontWeight: '700',
    color: '#3B82F6',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '600',
  },
  listContent: {
    padding: 16,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 100,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#6B7280',
    marginTop: 16,
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
  registeredBadge: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    backgroundColor: '#10B981',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  registeredBadgeText: {
    color: '#FFFFFF',
    fontSize: 12,
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
