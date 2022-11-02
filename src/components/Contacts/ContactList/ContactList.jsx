import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { ContactServices } from "../../../services/contactServices";
import Spinner from "../../spinner/spinner";

let ContactList = () => {
  let [query, setquery] = useState({
    text: "",
  });

  let [state, setState] = useState({
    loading: false,
    contacts: [],
    filterContacts: [],
    errorMessage: "",
  });

  useEffect(() => {
    try {
      (async function fetchdata() {
        setState({ ...state, loading: true });
        let response = await ContactServices.getAllContacts();
        setState({
          ...state,
          loading: false,
          contacts: response.data,
          filterContacts: response.data,
        });
        console.log(response.data);
      })();
    } catch (error) {
      setState({
        ...state,
        loading: false,
        errorMessage: error.message,
      });
    }
  }, []);

  //delete contact
  let clickDelete = async (contactId) => {
    try {
      let response = await ContactServices.deleteContact(contactId);
      if (response) {
        (async function fetchdata() {
          setState({ ...state, loading: true });
          let response = await ContactServices.getAllContacts();
          setState({
            ...state,
            loading: false,
            contacts: response.data,
            filterContacts: response.data,
          });
          console.log(response.data);
        })();
      }
    } catch (error) {
      setState({
        ...state,
        loading: false,
        errorMessage: error.message,
      });
    }
  };

  //search
  let searchContact = (event) => {
    setquery({
      ...query,
      text: event.target.value,
    });
    let theContacts = state.contacts.filter((contact) => {
      return contact.name
        .toLowerCase()
        .includes(event.target.value.toLowerCase());
    });
    console.log(theContacts, "filter");
    setState({
      ...state,
      filterContacts: theContacts,
    });
  };

  let { loading, contacts, filterContacts, errorMessage } = state;
  return (
    <>
      <section className="contact-search p-3">
        <div className="container">
          <div className="grid">
            <div className="row">
              <div className="col">
                <p className="h3 fw-bold">
                  Conatct Manager
                  <Link to={"/contact/add"} className="btn btn-primary ms-2">
                    <i className="fa fa-plus-circle me-2" />
                    New
                  </Link>
                </p>
                <p className="fst-italic">Hii myself mayank shahu</p>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <form className="row">
                  <div className="col">
                    <div className="mb-2">
                      <input
                        type="text"
                        name="text"
                        value={query.text}
                        onChange={searchContact}
                        className="form-control"
                        placeholder="Search Names"
                      ></input>
                    </div>
                  </div>
                  <div className="col">
                    <div className="mb-2">
                      <input
                        type="submit"
                        className="btn btn-outlin-dark"
                        value="Search "
                      ></input>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <section className="contact-list">
            <div className="container">
              <div className="row">
                {filterContacts.length > 0 &&
                  filterContacts.map((contact) => {
                    return (
                      <div className="col-md-6" key={contact.id}>
                        <div className="card my-2">
                          <div className="card-body">
                            <div className="row align-items-center d-flex justify-content-around">
                              <div className="col-md-4">
                                <img
                                  src={contact.photo}
                                  alt=""
                                  className=" contact-img"
                                />
                              </div>
                              <div className="col-md-7">
                                <ul className="list-group">
                                  <li className="list-group-item list-group-item-action">
                                    Name:{" "}
                                    <span className="fw-bold">
                                      {contact.name}
                                    </span>
                                  </li>
                                  <li className="list-group-item list-group-item-action">
                                    MobileNo:{" "}
                                    <span className="fw-bold">
                                      {contact.mobile}
                                    </span>
                                  </li>
                                  <li className="list-group-item list-group-item-action">
                                    Email:
                                    <span className="fw-bold">
                                      {contact.email}
                                    </span>
                                  </li>
                                </ul>
                              </div>
                              <div className="col-md-1 d-flex flex-column align-items-center">
                                <Link
                                  to={`/contact/view/${contact.id}`}
                                  className="btn btn-warning my-1"
                                >
                                  <i className="fa fa-eye"></i>
                                </Link>
                                <Link
                                  to={`/contact/edit/${contact.id}`}
                                  className="btn btn-primary my-1"
                                >
                                  <i className="fa fa-pen"></i>
                                </Link>
                                <button
                                  className="btn btn-danger my-1"
                                  onClick={() => clickDelete(contact.id)}
                                >
                                  <i className="fa fa-trash" />
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          </section>
        </>
      )}
    </>
  );
};
export default ContactList;
