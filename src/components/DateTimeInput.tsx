import { useState } from "react"
import { StyleSheet, TextInput, TouchableOpacity } from "react-native"
import DateTimePicker from "@react-native-community/datetimepicker"

interface Props {
  value: Date
  mode: "date" | "time"
  onChange: (date: Date) => void
  placeholder: string
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 3,
    borderRadius: 5,
    borderColor: "#CCCCCC",
    padding: 10,
    marginVertical: 10
  }
})

const DateTimeInput: React.FC<Props> = ({
  value,
  mode,
  onChange,
  placeholder
}) => {
  const [showPicker, setShowPicker] = useState<boolean>(false)

  const onPress = () => {
    setShowPicker(true)
  }

  const onSelectedPeriod = (event: any, selectedDate?: Date) => {
    setShowPicker(false)
    if (selectedDate) {
      onChange(selectedDate)
    }
  }

  //Checks which mode user selected and returns date or time string
  const checkDateTimeMode = (mode: string) => {
    return mode == "date"
      ? value.toISOString().split("T")[0]
      : value.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit"
        })
  }

  return (
    <>
      <TouchableOpacity onPress={onPress}>
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          editable={false}
          value={checkDateTimeMode(mode)}
        />
      </TouchableOpacity>
      {showPicker && (
        <DateTimePicker
          value={value}
          mode={mode}
          display="default"
          is24Hour={true}
          onChange={onSelectedPeriod}
        />
      )}
    </>
  )
}

export default DateTimeInput
