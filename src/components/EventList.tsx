import { StyleSheet, Text } from "react-native"
import { Event } from "../models/Events"
import EventItem from "./EventItem"

interface Props {
  events: Event[]
  onEditEvent: (event: Event) => void
  onDeleteEvent: (eventId: string) => void
}

const styles = StyleSheet.create({
  emptyListText: {
    fontSize: 18,
    marginTop: 10
  }
})

const EventList: React.FC<Props> = ({ events, onEditEvent, onDeleteEvent }) => {
  return events.length === 0 ? (
    <Text style={styles.emptyListText}>There are currently no events.</Text>
  ) : (
    events.map((event) => {
      return (
        <EventItem
          event={event}
          onEditEvent={onEditEvent}
          onDeleteEvent={onDeleteEvent}
        />
      )
    })
  )
}

export default EventList
