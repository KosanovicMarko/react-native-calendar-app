import { SetStateAction, useState } from "react"
import { Calendar } from "react-native-calendars"

interface Event {
  id: string
  title: string
  date: string
  time: string
  description?: string
}

type day = { dateString: SetStateAction<string> }

type Props = {
  selectedDate: string
  setSelectedDate: React.Dispatch<React.SetStateAction<string>>
  events: Event[]
}

const CalendarScreen: React.FC<Props> = ({
  selectedDate,
  setSelectedDate,
  events
}) => {
  // Create an object to mark dates with events
  const markedDates = events.reduce(
    (acc, event) => {
      acc[event.date] = { marked: true, dotColor: "red" }
      return acc
    },
    {} as { [date: string]: any }
  )

  // Mark the selected date
  markedDates[selectedDate] = {
    ...(markedDates[selectedDate] || {}),
    selected: true,
    selectedColor: "#89CFF0"
  }

  return (
    <Calendar
      onDayPress={(day: day) => {
        setSelectedDate(day.dateString)
      }}
      markedDates={markedDates}
      style={{ marginTop: 20 }}
    />
  )
}

export default CalendarScreen
