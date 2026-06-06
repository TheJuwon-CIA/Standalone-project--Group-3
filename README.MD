# Personal Notes App

A simple, persistent notes app built with React Native (Expo), Zustand, and AsyncStorage.  
Create, view, and delete notes – all data survives app restarts.

## Features

- ✅ Create notes with title + content  
- ✅ View full note in a modal  
- ✅ Delete notes with a tap  
- ✅ FlatList for efficient scrolling  
- ✅ Zustand global state management  
- ✅ AsyncStorage persistence – notes stay on device  
- ✅ Clean, component‑based architecture  

## Tech Stack

- React Native (Expo)  
- Zustand (state + persistence middleware)  
- AsyncStorage  
- JavaScript (ES6+)  

## Project Structure

## Installation & Running

1. **Clone or create the project**  
   ```bash
   npx create-expo-app notes-app
   cd notes-app
Replace default files with the code above.

Install dependencies
notes-app/
├── App.js
├── app.json
├── package.json
├── README.md
├── store/
│   └── noteStore.js
├── components/
│   ├── NoteCard.js
│   ├── NoteInput.js
│   └── NoteModal.js
└── styles/
    └── globalStyles.js
bash
npm install
Start the app

bash
npx expo start
Scan QR code with Expo Go (Android/iOS) or run on emulator.

Usage
Type a note (title optional) → press + Add Note

Tap any note to read it in full screen

Tap the 🗑️ icon to delete a note

All notes are automatically saved and reloaded when you reopen the app

Customisation
Change accent colour in styles/globalStyles.js (colors.primary)

Extend the store to add edit functionality 

Add search by filtering notes in the store

License
MIT
