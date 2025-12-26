# MSU Smart Kiosk - Product Requirements Document (PRD)

## Project Overview
The MSU Smart Kiosk is an interactive terminal designed for university students and visitors. It provides a centralized hub for university services, information, and AI-powered assistance. The system uses Computer Vision for user identification and a RAG (Retrieval-Augmented Generation) AI agent for intelligent interactions.

## Objectives
- Provide an intuitive and premium user interface for university information.
- Streamline access to common university services.
- Enable personalized assistance through AI and user identification.
- Ensure the interface is optimized for a 9:16 portrait display (kiosk format).

## Target Audience
- **Students**: Enrolled students seeking information about classes, grades, or services.
- **Visitors/Guests**: Prospective students or parents looking for campus directions or general info.
- **Faculty/Staff**: University employees accessing administrative services.

## Functional Requirements

### 1. User Identification (Computer Vision)
- The system should use a camera to identify the user.
- Feature an "Identity Confirmation" step to allow the user to confirm their persona.
- Provide a greeting tailored to the identified user.

### 2. AI Chatbot (RAG Agent)
- Integrated AI assistant capable of answering university-specific questions.
- Support for text input via an on-screen keyboard.
- RAG integration to ensure accurate and up-to-date information fetch from university documents.

### 3. Service Directory
- A categorization of available university services (e.g., Academic, Financial, Student Life).
- Interactive cards/menus for easy navigation.

### 4. Campus Map (Planned)
- Interactive map for wayfinding.
- Integration with current user location (kiosk location).

### 5. FAQ Section (Planned)
- Dynamic FAQ based on common queries.

## Non-Functional Requirements

### 1. User Interface & Experience
- **Aspect Ratio**: 9:16 (Portrait) optimized.
- **Aesthetics**: Premium, modern design with glassmorphism effects, gradients, and smooth animations.
- **Responsiveness**: Accessible via web but optimized for large touchscreens.
- **Typography**: Modern, readable fonts (e.g., Inter, Outfit).

### 2. Performance
- Fast page transitions.
- Low latency in AI responses.

### 3. Accessibility
- High contrast options.
- Large interactive zones for touch input.

## Tech Stack
- **Frontend**: Next.js, React, Tailwind CSS.
- **Animations**: Framer Motion.
- **AI**: RAG-based LLM integration.
- **Identification**: Computer Vision (integration with backend API).
