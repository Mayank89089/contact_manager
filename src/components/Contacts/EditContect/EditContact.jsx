import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { ContactServices } from "../../../services/contactServices";

let EditContact = () => {
  let Navigate = useNavigate();
  let { contactId } = useParams();

  let [state, setState] = useState({
    loading: false,
    contact: {
      name: "",
      photo: "",
      mobile: "",
      email: "",
      company: "",
      title: "",
      groupId: "",
    },
    groups: [],
    errorMessage: "",
  });

  useEffect(() => {
    try {
      (async function fetchdata() {
        setState({ ...state, loading: false });
        let response = await ContactServices.getContact(contactId);
        let groupResponse = await ContactServices.getGroups();
        setState({
          ...state,
          loading: true,
          contact: response.data,
          groups: groupResponse.data,
        });
      })();
    } catch (error) {
      setState({
        ...state,
        loading: false,
        errorMessage: error.message,
      });
    }
  }, [contactId]);

  let updateInput = (event) => {
    setState({
      ...state,
      contact: {
        ...state.contact,
        [event.target.name]: event.target.value,
      },
    });
  };

  let submitForm = async (event) => {
    event.preventDefault();
    try {
      let response = await ContactServices.updatecontact(
        state.contact,
        contactId
      );
      console.log(response, "resposne");
      if (response) {
        Navigate("/contact/list", { replace: true });
      }
    } catch (error) {
      setState({ ...state, errorMessage: error.message });
      Navigate(`/contact/edit/${contactId}`, { replace: false });
    }
  };

  let { loading, contact, groups, errorMessage } = state;

  return (
    <>
      <section className="add-contact p-3">
        <div className="container">
          <div className="row">
            <div className="col">
              <p className="h4 text-primary fw-bold">Edit Contact</p>
              <p className="fst-italic">
                It's a contact add page you can add contact here
              </p>
            </div>
          </div>
          <div className="row align-items-center">
            <div className="col-md-4">
              <form onSubmit={submitForm}>
                <div className="mb-2">
                  <input
                    required="true"
                    name="name"
                    onChange={updateInput}
                    value={contact.name}
                    type="text"
                    className="form-control"
                    placeholder="name"
                  />
                </div>
                <div className="mb-2">
                  <input
                    required="true"
                    name="photo"
                    onChange={updateInput}
                    value={contact.photo}
                    type="text"
                    className="form-control"
                    placeholder="Photo Url"
                  />
                </div>
                <div className="mb-2">
                  <input
                    required="true"
                    name="mobile"
                    onChange={updateInput}
                    value={contact.mobile}
                    type="number"
                    className="form-control"
                    placeholder="Mobile No"
                  />
                </div>
                <div className="mb-2">
                  <input
                    required="true"
                    name="email"
                    onChange={updateInput}
                    value={contact.email}
                    type="email"
                    className="form-control"
                    placeholder="Email"
                  />
                </div>
                <div className="mb-2">
                  <input
                    required="true"
                    name="company"
                    onChange={updateInput}
                    value={contact.company}
                    type="text"
                    className="form-control"
                    placeholder="Company"
                  />
                </div>
                <div className="mb-2">
                  <input
                    required="true"
                    name="title"
                    onChange={updateInput}
                    value={contact.title}
                    type="text"
                    className="form-control"
                    placeholder="Title"
                  />
                </div>
                <div className="mb-2">
                  <select
                    required="true"
                    name="groupId"
                    value={contact.groupId}
                    onChange={updateInput}
                    className="form-control"
                  >
                    <option value="">select a group </option>
                    {groups.length > 0 &&
                      groups.map((group) => {
                        return (
                          <option key={group.id} value={group.id}>
                            {group.name}
                          </option>
                        );
                      })}
                  </select>
                </div>
                <div className="mb-2">
                  <input
                    type="submit"
                    className="btn btn-primary  "
                    value="Update"
                  />
                  <Link to={"/contact/list"} className="btn btn-dark ms-2">
                    Cancel
                  </Link>
                </div>
              </form>
            </div>
            <div className="col-md-6">
              <img src={contact.photo} alt="image" className="contact-img" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export default EditContact;
