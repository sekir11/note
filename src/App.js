import { useEffect, useState } from "react";
import "./App.css";
import Main from "./components/Main";
import Sidebar from "./components/Sidebar";
import { db } from "./firebase";
import {
  collection,
  addDoc,
  deleteDoc,
  getDocs,
  doc,
  updateDoc,
} from "firebase/firestore";

function App() {
  const [notes, setNotes] = useState([]);
  const [activeNote, setActiveNote] = useState(false);

  // useEffect(() => {
  //   localStorage.setItem("notes", JSON.stringify(notes));
  // }, [notes]);
  const getMemo = async () => {
    const data = await getDocs(collection(db, "memoList"));
    setNotes(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  useEffect(() => {
    getMemo();
  }, []);

  const onAddNote = async () => {
    const newNote = {
      title: "",
      content: "",
      modDate: Date.now(),
    };

    await addDoc(collection(db, "memoList"), newNote);
    getMemo();
    // setNotes([...notes, newNote]);
  };

  const onDeleteNote = async (id) => {
    await deleteDoc(doc(db, "memoList", id));
    const filterNotes = notes.filter((note) => note.id !== id);
    setNotes(filterNotes);
  };

  const getActiveNote = () => {
    return notes.find((note) => note.id === activeNote);
  };

  const onUpdateNote = (updatedNote) => {
    const updatedNotes = notes.map((note) => {
      if (note.id === updatedNote.id) {
        updateNote(updatedNote);
        return updatedNote;
      } else {
        return note;
      }
    });
    console.log(updatedNotes);
    setNotes(updatedNotes);
  };

  const updateNote = async (note) => {
    await updateDoc(doc(db, "memoList", note.id), note);
  };

  return (
    <div className="App">
      <Sidebar
        onAddNote={onAddNote}
        onDeleteNote={onDeleteNote}
        notes={notes}
        activeNote={activeNote}
        setActiveNote={setActiveNote}
      />
      <Main activeNote={getActiveNote()} onUpdateNote={onUpdateNote} />
    </div>
  );
}

export default App;
