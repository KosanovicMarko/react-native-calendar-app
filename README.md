## Prerequisites for working on this project

- Expo dev account

Before running the application, ensure you have the following software installed:

- Node.js: Version 18.x.x
- Yarn: Version 1.22.x
- Expo CLI: Version 6.x.x
- Android Studio: For Android SDK and emulator setup (if testing on an emulator)
- Android SDK: API Level 33 or higher
- Android Build Tools: Version 33.0.x
- Java Development Kit (JDK): Version 11 or higher

## Software Versions

- Node.js: 18.17.1
- Yarn: 1.22.19
- Expo CLI: 6.3.5
- React: 18.2.0
- React Native: 0.74.5
- Android SDK: API Level 33
- JDK: 11

## Installation and Setup

1.  Clone the repository

    - `git clone https://github.com/yourusername/react-native-calendar-app.git`

2.  Install Expo CLI Globally

    - `npm install -g expo-cli`

3.  Navigate to the Project Directory

    - `cd react-native-test`

4.  Install Dependencies

    - `yarn install`

5.  Start the Expo Development Server

    - On an Emulator:

      Ensure you have an Android emulator running (e.g., using Android Studio's AVD Manager).

            In another terminal window, run:
            `yarn android`

    - On a Physical Device:

      Connect your Android device via USB with USB debugging enabled.

      Run:
      `yarn android:device`

## Scripts

- Start the Development Server: `yarn start`
- Run on Android Emulator: `yarn android`
- Run on Connected Android Device: `yarn android:device`
- Build for Development: `yarn build:development`
- Build for Production: `yarn build:production`

## Important Dependencies

- Expo: ~51.0.28
- React Native: 0.74.5
- React: 18.2.0
- React Native Calendars: ^1.1306.0
- React Navigation: ^6.x.x
- AsyncStorage: ^2.0.0
- UUID: ^10.0.0
- DateTimePicker: ^8.2.0
- TypeScript: ~5.3.3

## Development Environment Setup

- Node.js Download and install from the official website or use a version manager like nvm.

- Yarn: install globally using npm:
  `npm install -g yarn`

-Expo CLI
Install Expo CLI globally
`npm install -g expo-cli`

## Android Studio and SDK

1. Download Android Studio: Install from the official website.

2. Set Up Android SDK:

   - Open Android Studio and go to SDK Manager.
   - Install Android SDK Platform 33 and Android SDK Build-Tools 33.

3. Set Environment Variables (optional but recommended):

   - on macOS/Linux:

   - Add the following to your `~/.bash_profile`, `~/.zshrc`, or `~/.bashrc`:

   `export ANDROID_HOME=$HOME/Library/Android/sdk`
   `export PATH=$PATH:$ANDROID_HOME/emulator`
   `export PATH=$PATH:$ANDROID_HOME/platform-tools`

   - on Windows:

   - Set ANDROID_HOME to
     `C:\Users\YourUsername\AppData\Local\Android\Sdk.`

   - Add
     `%ANDROID_HOME%\emulator` and `%ANDROID_HOME%\platform-tools` to your PATH.

## Java Development Kit (JDK)

Download and install JDK 11 or higher from Adoptium or Oracle.

## Test the app

You can use one of those following commands to create tests versions of the app:

- `yarn build:development`

Once the build is completed follow the generated link.
