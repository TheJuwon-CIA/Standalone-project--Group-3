markdown
# Personal Notes App – TypeScript

A fully typed, persistent notes app built with React Native (Expo), Zustand, and AsyncStorage.  
Create, view, and delete notes – all data survives app restarts.

## Features

- ✅ Create notes with title + content  
- ✅ View full note in a modal  
- ✅ Delete notes with a tap  
- ✅ FlatList for efficient scrolling  
- ✅ Zustand global state management with persistence  
- ✅ AsyncStorage for offline storage  
- ✅ **Full TypeScript** – strict mode, typed store, components, and props  

## Tech Stack

- React Native (Expo)  
- TypeScript  
- Zustand (state + persist middleware)  
- AsyncStorage  

## Project Structure
notes-app-ts/
├── assets/
│   ├── generate-assets.ts   
│   ├── icon.png             
│   ├── splash.png           
│   ├── adaptive-icon.png    
│   └── favicon.png          
├── App.tsx
├── store/noteStore.ts
├── components/...
├── styles/globalStyles.ts
├── types/note.ts
├── package.json
├── tsconfig.json
└── README.md

## Installation & Running

1. **Create a new Expo project**  
   ```bash
   npx create-expo-app notes-app-ts --template
   # Choose "blank (TypeScript)" when prompted

Install dependencies

bash
npm install
Start the app

bash
npx expo start
Scan QR code with Expo Go (Android/iOS) or run on an emulator.

Usage
Type a note (title optional) → press + Add Note

Tap any note to read it in full screen

Tap the 🗑️ icon to delete a note
To run the app:  
1. Create a new Expo TypeScript project:  
   ```bash
   npx create-expo-app notes-app-ts --template

Run npm install then npx expo start.

The app will compile and run without any TypeScript errors.

All notes are automatically saved and reloaded when you reopen the app

Type Safety Highlights
Note interface in types/note.ts

Zustand store is fully typed (NoteStore)

Component props explicitly defined

tsconfig.json with strict: true

Customisation
Change accent colour in styles/globalStyles.ts (colors.primary)

Add an edit feature using the pre‑written updateNote action

Add search by filtering the notes array in the store

License
MIT




