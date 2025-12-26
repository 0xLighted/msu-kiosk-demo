# MSU Smart Kiosk - Implementation Plan

## Phase 1: Foundation & Layout
- [x] Initial Next.js project setup.
- [x] Global styles and theme configuration (Tailwind + CSS).
- [x] Implementation of the 9:16 aspect ratio container for the kiosk view.
- [x] Core layout components: Header, Footer, and Main Container.

## Phase 2: Home Page & User ID
- [x] Design and implement the Home page.
- [x] Create the Greeting component with dynamic user data.
- [x] Implement the Camera Box component (Mock/Placeholder for now).
- [x] Develop the Menu Options for main navigation.
- [x] Identity Confirmation UI and logic flow.

## Phase 3: AI Chat System
- [x] Create the Chat page structure (`/chat`).
- [x] Implement on-screen keyboard using `react-simple-keyboard`.
- [x] Build Message list and Input components.
- [x] Add Framer Motion animations for message transitions and keyboard visibility.
- [ ] Integrate actual RAG backend (currently using mock responses).
- [ ] Add voice-to-text functionality (Optional/Future).

## Phase 4: Services Directory
- [x] Create the Services page structure (`/services`).
- [ ] Implement service categorization and search.
- [ ] Detail pages or modals for specific services.
- [ ] Integration with backend service data API.

## Phase 5: Map & FAQ
- [ ] Integrate an interactive Map (OpenStreetMap/Mapbox or custom SVGs).
- [ ] Implement a searchable FAQ section.
- [ ] Add "Common Questions" to the home page or chat page.

## Phase 6: Computer Vision Integration
- [ ] Connect the frontend camera feed to the CV backend.
- [ ] Implement real-time user detection and identification updates.
- [ ] Handle error states (e.g., user not recognized, multiple users).

## Phase 7: Polish & Optimization
- [ ] Finalize the "Premium" look with consistent glassmorphism and gradients.
- [ ] Performance audit for kiosks with lower hardware specs.
- [ ] Implement SEO and Meta tags.
- [ ] Final end-to-end testing of all user journeys.

## Timeline (Estimated)
- **Week 1-2**: Foundation, Home Page, Layout (Completed).
- **Week 3**: AI Chat System & Services UI (In Progress).
- **Week 4**: Backend integration (RAG + CV).
- **Week 5**: Polish and Testing.
