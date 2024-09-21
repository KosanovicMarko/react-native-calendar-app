import { Button, Modal, StyleSheet, Text, View } from "react-native"
import InputField from "./InputField"
import DateTimeInput from "./DateTimeInput"

interface Props {
  isVisible: boolean
  onClose: () => void
  onSave: () => void
  title: string
  setTitle: (text: string) => void
  eventDate: Date
  setEventDate: (date: Date) => void
  eventTime: Date
  setEventTime: (date: Date) => void
  description: string
  setDescription: (text: string) => void
  isEditing: boolean
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.5)"
  },
  modalContent: {
    backgroundColor: "white",
    marginHorizontal: 20,
    borderRadius: 8,
    padding: 16
  },
  modalTitle: {
    fontSize: 23,
    marginBottom: 12,
    textAlign: "center"
  }
})

const EventModal: React.FC<Props> = ({
  isVisible,
  onClose,
  onSave,
  title,
  setTitle,
  eventDate,
  setEventDate,
  eventTime,
  setEventTime,
  description,
  setDescription,
  isEditing
}) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>
            {isEditing ? "Edit Event" : "Add Event"}
          </Text>
          <InputField
            placeholder="Event Title"
            value={title}
            onChangeText={setTitle}
          />
          <InputField
            placeholder="Description"
            value={description}
            onChangeText={setDescription}
          />
          {/*Date Input*/}
          <DateTimeInput
            value={eventDate}
            mode="date"
            onChange={setEventDate}
            placeholder="Event Date"
          />
          {/* Time Input */}
          <DateTimeInput
            value={eventTime}
            mode="time"
            onChange={setEventTime}
            placeholder="Event Time"
          />
          <View style={{ marginTop: 10 }} />
          <Button
            title={isEditing ? "Update Event" : "Add Event"}
            onPress={onSave}
          />
          <View style={{ paddingVertical: 10 }} />
          <Button title="Cancel" onPress={onClose} />
        </View>
      </View>
    </Modal>
  )
}

export default EventModal
