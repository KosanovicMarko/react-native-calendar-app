import { StyleSheet, TextInput } from "react-native"

import { KeyboardTypeOptions } from "react-native"

interface Props {
  placeholder: string
  value: string
  onChangeText: (text: string) => void
  secureText?: boolean
  onBlur?: () => void
  autoCapitalize?: "none" | "sentences" | "words" | "characters" | undefined
  keyboardType?: KeyboardTypeOptions | undefined
  editable?: boolean
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

const InputField: React.FC<Props> = ({
  placeholder,
  value,
  onChangeText,
  secureText,
  onBlur,
  autoCapitalize,
  keyboardType,
  editable
}) => {
  return (
    <TextInput
      placeholder={placeholder}
      value={value}
      onChangeText={(text) => onChangeText(text)}
      style={styles.input}
      secureTextEntry={secureText}
      onBlur={onBlur}
      autoCapitalize={autoCapitalize}
      keyboardType={keyboardType}
      editable={editable}
    />
  )
}

export default InputField
