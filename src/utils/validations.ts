//regex for name, email and password validation
const nameRegex = /^[a-zA-Z\s]+$/
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const passwordRegex =
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/

export const validateName = (name: string) => {
  if (!name) return "Name is required"
  if (!nameRegex.test(name)) return "Invalid name format"
  return null
}

export const validateEmail = (email: string) => {
  if (!email) return "Email is required"
  if (!emailRegex.test(email)) return "Invalid email format"
  return null
}

export const validatePassword = (password: string) => {
  if (!password) return "Password is required"
  if (!passwordRegex.test(password))
    return "Password must be at least 8 characters long and include at least one number, one special character, and one letter."
  return null
}
