import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ContactServices } from "../../../services/contactServices";
import Spinner from "../../spinner/spinner";

let ViewContact = () => {
  let { contactId } = useParams();

  let [state, setState] = useState({
    loading: true,
    contact: {},
    errorMessage: "",
    group: {},
  });
  useEffect(() => {
    try {
      async function fetchdata() {
        setState({ ...state, loading: false });
        let response = await ContactServices.getContact(contactId);
        let groupResponse = await ContactServices.getGroup(response.data);
        setState({
          ...state,
          loading: false,
          contact: response.data,
          group: groupResponse.data,
        });
        console.log(response.data);
      }
      fetchdata();
    } catch (error) {
      setState({
        ...state,
        loading: false,
        errorMessage: error.message,
      });
    }
  }, [contactId]);

  let { loading, contact, errorMessage, group } = state;

  return (
    <>
      <h2>{contactId}</h2>
      <section className="view-contact-intro p-3">
        <div className="container">
          <div className="row align-items-center">
            <div className="col">
              <p className="h3 text-warning fw-bold">View Contact</p>
              <p className="fst-italic">
                {" "}
                It's View Page here you can view the page
              </p>
            </div>
          </div>
        </div>
      </section>
      {loading ? (
        <Spinner />
      ) : (
        <>
          {Object.keys(contact).length > 0 &&
            Object.keys(group).length > 0 && (
              <section className="view-contact mt-3">
                <div className="container">
                  <div className="row">
                    <div className="col-md-4">
                      <img src={contact.photo} alt="" className="contact-img" />
                    </div>
                    <div className="col-md-8  ">
                      <ul className="list-group">
                        <li className="list-group-item list-group-item-action">
                          Name: <span className="fw-bold">{contact.name}</span>
                        </li>
                        <li className="list-group-item list-group-item-action">
                          MobileNo:{" "}
                          <span className="fw-bold">{contact.mobile}</span>
                        </li>
                        <li className="list-group-item list-group-item-action">
                          Email:<span className="fw-bold">{contact.email}</span>
                        </li>
                        <li className="list-group-item list-group-item-action">
                          Company:
                          <span className="fw-bold">{contact.company}</span>
                        </li>
                        <li className="list-group-item list-group-item-action">
                          Title:<span className="fw-bold">{contact.title}</span>
                        </li>
                        <li className="list-group-item list-group-item-action">
                          Group:<span className="fw-bold">{group.name}</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col">
                      <Link to={"/contact/list"} className="btn btn-warning">
                        Back
                      </Link>
                    </div>
                  </div>
                </div>
              </section>
            )}{" "}
        </>
      )}
    </>
  );
};
export default ViewContact;
