import { ReactNode } from "react"
import { StyleSheet, Text, View } from "react-native"

interface ContainerProps {
  title: string
  children: ReactNode
}

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    paddingBottom: 10
  },
  container: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    padding: 20,
    flex: 1
  }
})

const Container: React.FC<ContainerProps> = ({ title, children }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      {children}
    </View>
  )
}

export default Container
