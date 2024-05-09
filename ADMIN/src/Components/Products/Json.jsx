import React, { useState, useEffect } from 'react'
import { getFirestore, onSnapshot, query, collection } from "firebase/firestore";
import app from '../../../firebaseConfig';

export default function Json() {
    const [jsonData, setJsonData] = useState([])
    const [loading, setLoading] = useState(false)

    

    useEffect(() => {
        let unsubscribe;
      
        const fetchData = async () => {
          try {
            const db = getFirestore(app);
            const q = query(collection(db, "Products"));
      
            unsubscribe = onSnapshot(q, (querySnapshot) => {
              const products = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
              }));
              setJsonData(products);
              setLoading(false);
            });
      
            // No need to return unsubscribe here
          } catch (error) {
            setLoading(false);
            console.error('Error:', error);
            // Optionally add cleanup code for the error case
            // return cleanupFunctionForError;
          }
        };
      
        fetchData();
      
        // Cleanup function to detach the listener on unmount
        return () => {
          if (unsubscribe) {
            unsubscribe();
          }
        };
      }, []);

      const jsonString = JSON.stringify(jsonData, null, 2);

      const downloadLink = `data:application/json;charset=utf-8,${encodeURIComponent(jsonString)}`;

  return (
    <div>
      <h1>Adeego</h1>
      <p>This is some content on my website.</p>
      <h3>Raw JSON Data:</h3>
      <a href={downloadLink} download="my_data.json">Download JSON</a>
      <pre>{jsonString}</pre>
    </div>
  )
}
