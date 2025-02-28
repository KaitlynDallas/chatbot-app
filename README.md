# Frontend:

The frontend is a React application that provides a chat interface:

User Input & Message Display:

- When a user types a message and clicks "Send," the message appears in the chat UI immediately.
  
- The UI maintains a structured chat format, keeping user messages right-aligned and bot responses left-aligned.
  

Sending Data to Backend:

- The frontend converts the user’s message into a .txt file.
  
- This file is sent to the backend using a POST request (/upload).
  

Receiving Data from Backend:

- The frontend then fetches the chatbot’s response from the /response endpoint.
  
- The response is displayed in the chat UI.
  

Additional Features:

- The Edit Search button restores the last query to the input field for modification.
  
- The Export Chat button saves the chat conversation as a .txt file for download.
  

# Backend:

The backend is a simple Express server that handles file uploads and returns chatbot responses.


Receiving Messages (POST /upload)

- The backend accepts a .txt file containing the user’s message.
  
- It simulates processing and stores a predefined response.
  

Returning Chatbot Responses (GET /response)

- The server reads the stored response and sends it back as a .txt file.
  
- The frontend fetches this response and displays it in the chat.
  

Tech Stack:

- express for handling HTTP requests
  
- multer for file uploads
  
- cors for enabling frontend-backend communication
  
<img width="1200" alt="Screenshot 2025-02-28 at 12 28 57 PM" src="https://github.com/user-attachments/assets/d240b2ee-53fc-4738-a25c-bff2577efc93" />


https://github.com/user-attachments/assets/5620caa2-07e5-403e-885a-54d6d7030d9f





