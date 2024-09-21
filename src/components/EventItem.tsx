import { StyleSheet, Text, View, TouchableOpacity } from "react-native"
import { Event } from "../models/Events"
import { Ionicons } from "@expo/vector-icons"

interface Props {
  event: Event
  onEditEvent: (event: Event) => void
  onDeleteEvent: (eventId: string) => void
}

const styles = StyleSheet.create({
  eventItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 15,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderColor: "#CCCCCC"
  },
  eventTitle: { fontSize: 18, fontWeight: "bold" },
  eventDateTime: {
    fontSize: 16
  },
  eventDesc: {
    fontSize: 16
  },
  eventActions: { flexDirection: "row" },
  editText: { marginRight: 16 }
})

const EventItem: React.FC<Props> = ({ event, onEditEvent, onDeleteEvent }) => {
  const displayTime = (timeString: string) => {
    const [hours, minutes] = timeString.split(":").map(Number)
    const date = new Date()
    date.setHours(hours, minutes)
    return date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true
    })
  }

  return (
    <View style={styles.eventItem} key={event.id}>
      <View>
        <Text style={styles.eventTitle}>{event.title}</Text>
        <Text style={styles.eventDateTime}>
          {event.date} at {displayTime(event.time)}
        </Text>
        {event.description ? (
          <Text style={styles.eventDesc}>{event.description}</Text>
        ) : null}
      </View>
      <View style={styles.eventActions}>
        <TouchableOpacity
          style={styles.editText}
          onPress={() => onEditEvent(event)}
        >
          <Ionicons name="pencil-sharp" size={24} color="#89CFF0" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onDeleteEvent(event.id)}>
          <Ionicons name="trash-sharp" size={24} color="#CF142B" />
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default EventItem
