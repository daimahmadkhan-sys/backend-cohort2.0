import { useEffect, useState } from "react";
import axios from "axios";
const App = () => {
  const [note, setNote] = useState([]);

  function fetchNotes() {
    axios.get("http://localhost:3000/api/notes").then((res) => {
      setNote(res.data.notes);
    });
  }

  useEffect(() => {
    fetchNotes();
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    const { title, description } = e.target.elements;

    axios
      .post("http://localhost:3000/api/notes", {
        title: title.value,
        description: description.value,
      })
      .then((res) => {
        fetchNotes();
      });
  }

  function handleDeleteNote(noteId) {
    axios.delete("http://localhost:3000/api/notes/" + noteId).then((res) => {
      fetchNotes();
    });
  }

  // function handleUpdateNote(noteId) {
  //   axios.patch("http://localhost:3000/api/notes/"+noteId , {
      
  //   })
  // }
  return (
    <>
      <form className="note-create-form" onSubmit={handleSubmit}>
        <input name="title" type="text" placeholder="Enter title" />
        <input name="description" type="text" placeholder="Enter description" />
        <button>Create Note</button>
      </form>
      <div className="notes">
        {note.map((note, idx) => {
          return (
            <div key={idx} className="note">
              <h1>{note.title}</h1>
              <p>{note.description}</p>
              <button id="delete-btn" onClick={() => {handleDeleteNote(note._id)}}>Delete</button>
              {/* <button onClick={()=>{handleUpdateNote(note._id)}}>Edit desc</button> */}
            </div>
          );
        })}
      </div>
    </>
  );
};

export default App;
