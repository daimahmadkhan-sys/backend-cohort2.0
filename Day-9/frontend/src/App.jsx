import { useEffect, useState } from "react";
import axios from "axios";
const App = () => {
  const [note, setNote] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3000/api/notes").then((res) => {
      setNote(res.data.notes);
    });
  }, []);

  return (
    <>
      <div className="notes">
        {note.map((note, idx) => {
          return (
            <div key={idx} className="note">
              <h1>{note.title}</h1>
              <p>{note.description}</p>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default App;
