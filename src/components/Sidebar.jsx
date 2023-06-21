import React from "react";
import "./Sidebar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faAdd } from "@fortawesome/free-solid-svg-icons";

const Sidebar = ({
  onAddNote,
  onDeleteNote,
  notes,
  activeNote,
  setActiveNote,
}) => {
  const sortedNotes = notes.sort((a, b) => b.modDate - a.modDate);

  return (
    <div className="app-sidebar">
      <div className="app-sidebar-header">
        <h1>メモ</h1>
        <FontAwesomeIcon
          className="add"
          icon={faAdd}
          onClick={onAddNote}
        ></FontAwesomeIcon>
      </div>
      <div className="app-sidebar-notes">
        {sortedNotes.map((note) => (
          <div
            className={`app-sidebar-note ${note.id === activeNote && "active"}`}
            key={note.id}
            onClick={() => {
              setActiveNote(note.id);
            }}
          >
            <div className="sidebar-note-title">
              <strong>{note.title}</strong>
              <FontAwesomeIcon
                icon={faXmark}
                onClick={() => onDeleteNote(note.id)}
              ></FontAwesomeIcon>
            </div>
            <p>{note.content}</p>
            <small>
              {new Date(note.modDate).toLocaleDateString("ja-JP", {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </small>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
