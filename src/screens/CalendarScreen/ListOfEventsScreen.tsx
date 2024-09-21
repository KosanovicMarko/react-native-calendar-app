import AsyncStorage from "@react-native-async-storage/async-storage"
import { useEffect, useState } from "react"
import { Alert, Button } from "react-native"
import { Event } from "../../models/Events"
import "react-native-get-random-values"
import { v4 as uuidv4 } from "uuid"
import Container from "../../components/Container"
import EventList from "../../components/EventList"
import EventModal from "../../components/EventModal"

interface Props {
  selectedDate: string
  onEventsChange: (events: Event[]) => void
}

export const ListOfEventsScreen: React.FC<Props> = ({
  selectedDate,
  onEventsChange
}) => {
  const [events, setEvents] = useState<Event[]>([])
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([])

  // Modal and form state
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false)
  const [id, setId] = useState<string | null>(null)
  const [title, setTitle] = useState("")
  const [eventDate, setEventDate] = useState<Date>(new Date(selectedDate))
  const [eventTime, setEventTime] = useState<Date>(new Date())
  const [description, setDescription] = useState("")

  // Load events from storage when component mounts
  useEffect(() => {
    const loadEvents = async () => {
      try {
        const storedEvents = await AsyncStorage.getItem("events")
        if (storedEvents) {
          const parsedEvents = JSON.parse(storedEvents)
          if (Array.isArray(parsedEvents)) {
            setEvents(parsedEvents)
          } else {
            console.error("Parsed events is not an array:", parsedEvents)
            setEvents([])
          }
        } else {
          setEvents([])
        }
      } catch (e) {
        Alert.alert("Error", "Error loading events from AsyncStorage:")
        setEvents([])
      }
    }

    loadEvents()
  }, [])

  // Save events to storage whenever events change
  useEffect(() => {
    const saveEvents = async () => {
      try {
        await AsyncStorage.setItem("events", JSON.stringify(events))
      } catch (error) {
        console.error("Error saving events to AsyncStorage:", error)
      }
    }

    saveEvents()

    // Notify parent component about events change
    onEventsChange(events)
  }, [events])

  // Filter events when selectedDate or events change
  useEffect(() => {
    if (Array.isArray(events)) {
      const eventsForSelectedDate = events.filter(
        (event: Event) => event.date === selectedDate
      )
      setFilteredEvents(eventsForSelectedDate)
    } else {
      console.error("Events is not an array:", events)
      setFilteredEvents([])
    }
  }, [selectedDate, events])

  const onOpenModal = () => {
    // Reset form fields
    setId(null)
    setTitle("")
    setEventDate(new Date(selectedDate))
    setEventTime(new Date())
    setDescription("")
    setIsModalVisible(true)
  }

  const onCloseModal = () => {
    setIsModalVisible(false)
  }

  const onAddOrUpdateEvent = () => {
    if (title.trim() === "") {
      Alert.alert("Validation", "Please enter an event title.")
      return
    }

    const eventDateString = eventDate.toISOString().split("T")[0]
    const eventTimeString = eventTime.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false
    })

    if (id) {
      // Update existing event
      const updatedEvents = events.map((event) =>
        event.id === id
          ? {
              ...event,
              title,
              date: eventDateString,
              time: eventTimeString,
              description
            }
          : event
      )
      setEvents(updatedEvents)
    } else {
      if (filteredEvents.length >= 5) {
        Alert.alert("Error", "You can enter max of 5 events per day.")
        return
      }
      // Add new event
      const newEvent: Event = {
        id: uuidv4(),
        title,
        date: eventDateString,
        time: eventTimeString,
        description
      }
      setEvents([...events, newEvent])
    }

    // Close modal and reset form
    onCloseModal()
  }

  const onEditEvent = (event: Event) => {
    setId(event.id)
    setTitle(event.title)
    setEventDate(new Date(event.date))
    const [hours, minutes] = event.time.split(":").map(Number)
    const time = new Date()
    time.setHours(hours, minutes)
    setEventTime(time)
    setDescription(event.description || "")
    setIsModalVisible(true)
  }

  const onDeleteEvent = (eventId: string) => {
    Alert.alert("Delete Event", "Are you sure you want to delete this event?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => {
          const updatedEvents = events.filter((event) => event.id !== eventId)
          setEvents(updatedEvents)
        }
      }
    ])
  }

  return (
    <Container title="List of Events">
      <Button title="Add Event" onPress={onOpenModal} />
      <EventList
        events={filteredEvents}
        onEditEvent={onEditEvent}
        onDeleteEvent={onDeleteEvent}
      />
      <EventModal
        isVisible={isModalVisible}
        onClose={onCloseModal}
        onSave={onAddOrUpdateEvent}
        title={title}
        setTitle={setTitle}
        eventDate={eventDate}
        setEventDate={setEventDate}
        eventTime={eventTime}
        setEventTime={setEventTime}
        description={description}
        setDescription={setDescription}
        isEditing={!!id}
      />
    </Container>
  )
}

export default ListOfEventsScreen
