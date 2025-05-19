// src/pages/api/contact.js

// Import necessary Firebase functions and the configured db instance
import { db } from '../../firebase'; // Updated path to firebase config
import { collection, addDoc, Timestamp } from 'firebase/firestore';

// Define the API route handler function
export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method === 'POST') {
    // Destructure data from the request body
    const { name, email, message } = req.body;

    // Basic server-side validation: Check if required fields are present
    if (!name || !email || !message) {
      // If validation fails, return a 400 Bad Request response
      return res.status(400).json({ error: 'All fields are required.' });
    }

    try {
      // Attempt to add a new document to the 'contacts' collection in Firestore
      const docRef = await addDoc(collection(db, 'contacts'), {
        name: name, // Store the name
        email: email, // Store the email
        message: message, // Store the message
        createdAt: Timestamp.now(), // Store the server timestamp when the entry was created
      });

      // Log success and return a 200 OK response to the client
      console.log("Document written with ID: ", docRef.id);
      return res.status(200).json({ message: 'Message sent successfully!' });

    } catch (error) {
      // Log any errors during the Firestore operation
      console.error('Error adding document to Firestore: ', error);
      // Return a 500 Internal Server Error response to the client
      return res.status(500).json({ error: 'Internal Server Error. Failed to save message.' });
    }
  } else {
    // If the request method is not POST, disallow it
    res.setHeader('Allow', ['POST']); // Indicate that only POST is allowed
    res.status(405).end(`Method ${req.method} Not Allowed`); // Return a 405 Method Not Allowed status
  }
} 