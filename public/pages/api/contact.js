// pages/api/contact.js

import { db } from '../../src/firebase'; // Adjust the path as needed
import { collection, addDoc, Timestamp } from 'firebase/firestore';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { name, email, m essage } = req.body;

    // Basic validation
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'All fields are required.' });
    }

    try {
      // Add a new document with a generated id
      await addDoc(collection(db, 'contacts'), {
        name,
        email,
        message,
        createdAt: Timestamp.now(),
      });

      return res.status(200).json({ message: 'Message sent successfully!' });
    } catch (error) {
      console.error('Error adding document: ', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    // Handle any non-POST requests
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
