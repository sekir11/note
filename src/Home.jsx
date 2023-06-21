import React, { useEffect, useState } from "react";
import Sidebar from "./components/Sidebar";
import Main from "./components/Main";
import { auth, db } from "./firebase";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";

const Home = ({ isAuth }) => {
  const [notes, setNotes] = useState([]);
  const [activeNote, setActiveNote] = useState(false);

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  const getMemo = () => {
    auth.onAuthStateChanged(async () => {
      const data = await getDocs(
        query(
          collection(db, "memoList"),
          where("author", "==", auth.currentUser.uid)
        )
      );
      setNotes(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });
  };

  useEffect(() => {
    getMemo();
  }, []);

  const onAddNote = async () => {
    const newNote = {
      title: "",
      content: "",
      modDate: Date.now(),
      author: auth.currentUser.uid,
    };

    const addedNote = await addDoc(collection(db, "memoList"), newNote);
    setNotes([{ ...newNote, id: addedNote.id }, ...notes]);
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
    setNotes(updatedNotes);
  };

  const updateNote = async (note) => {
    await updateDoc(doc(db, "memoList", note.id), {
      title: note.title,
      content: note.content,
      modDate: Date.now(),
    });
  };

  return (
    <div className="App">
      <Sidebar
        onAddNote={onAddNote}
        onDeleteNote={onDeleteNote}
        notes={notes}
        activeNote={activeNote}
        setActiveNote={setActiveNote}
        isAuth={isAuth}
      />
      <Main activeNote={getActiveNote()} onUpdateNote={onUpdateNote} />
    </div>
  );
};

export default Home;
