# **App Name**: Eden Access

## Core Features:

- Resident Sign-In: Secure sign-in for residents using Firebase Authentication.
- Guard Sign-In: Secure sign-in for guards using Firebase Authentication.
- Guest Access Code Generation: Residents can generate unique access codes for guests with a specified validity period. The code will act as a tool to check if a user has guest privileges, prior to granting them access to the property. If it's valid, it triggers Firebase functions that trigger SMS and Voice alerts to the resident.
- Guest Selfie Verification: Guests upload a selfie for verification against the approved guest list. Firebase cloud functions handle selfie uploads and send them for resident approval. Approvals stored on Firestore.
- Realtime Approvals Dashboard: Display for guards of a realtime dashboard, reflecting status on guest approvals.
- Resident Analytics Dashboard: Residents can view analytics related to guest visits.
- Guest Check-In/Check-Out: Guards can check-in and check-out guests, updating their status in Firestore.

## Style Guidelines:

- Dark background (#121212) with gold (#FFD700) and white (#FFFFFF) accents to convey luxury and modernity.
- Background color: Dark, desaturated variant of gold (#1A1805).
- Accent color: Soft gold (#E6B800), approximately 30 degrees to the left of the primary color.
- Body and headline font: 'Inter' (sans-serif) for a modern, clean interface.
- Premium, minimalist icons to represent various actions and data points.
- Rounded cards with subtle drop shadows and soft gradient backgrounds to provide a luxurious feel.
- Smooth micro-animations for buttons, cards, and notifications for enhanced user experience.