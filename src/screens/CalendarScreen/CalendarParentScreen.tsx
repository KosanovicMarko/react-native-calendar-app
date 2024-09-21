import Container from "../../components/Container"
import { useState } from "react"
import CalendarScreen from "./CalendarScreen"
import ListOfEventsScreen from "./ListOfEventsScreen"
import { ScrollView } from "react-native"

type CustomEvent = {
  id: string
  title: string
  date: string
  time: string
}

const CalendarParentScreen: React.FC = () => {
  const selectCurrentDate = new Date().toISOString().split("T")[0]
  const [selectedDate, setSelectedDate] = useState<string>(selectCurrentDate)
  const [events, setEvents] = useState<CustomEvent[]>([])

  const onEventsChange = (updatedEvents: CustomEvent[]) => {
    setEvents(updatedEvents)
  }

  return (
    <ScrollView>
      <Container title="Events">
        <CalendarScreen
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          events={events}
        />
        <ListOfEventsScreen
          selectedDate={selectedDate}
          onEventsChange={onEventsChange}
        />
      </Container>
    </ScrollView>
  )
}

export default CalendarParentScreen
