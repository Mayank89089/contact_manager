import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import ContentList from "./components/Contacts/ContactList/ContactList";
import AddContact from "./components/Contacts/AddContact/AddContact";
import ViewContact from "./components/Contacts/ViewContact/ViewContact";
import EditContact from "./components/Contacts/EditContect/EditContact";
import Spinner from "./components/spinner/spinner";

let App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to={"/contact/list"} />} />
        <Route path="/contact/list" element={<ContentList />}></Route>
        <Route path="/contact/add" element={<AddContact />}></Route>
        <Route
          path="/contact/view/:contactId"
          element={<ViewContact />}
        ></Route>
        <Route
          path="/contact/edit/:contactId"
          element={<EditContact />}
        ></Route>
      </Routes>
    </>
  );
};

export default App;
