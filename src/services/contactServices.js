import axios from "axios";

export class ContactServices {
  static serverURL = "http://localhost:9000";

  static getGroups() {
    let dataURL = `${this.serverURL}/groups`;
    return axios.get(dataURL);
  }

  static getGroup(contact) {
    let groupId = contact.groupId;
    let dataURL = `${this.serverURL}/groups/${groupId}`;
    return axios.get(dataURL);
  }

  static getAllContacts() {
    let dataURL = `${this.serverURL}/users`;
    return axios.get(dataURL);
  }

  static getContact(contactid) {
    let dataURL = `${this.serverURL}/users/${contactid}`;
    return axios.get(dataURL);
  }

  static createContact(contact) {
    let dataURL = `${this.serverURL}/users`;
    return axios.post(dataURL, contact);
  }

  static updatecontact(contact, contactId) {
    let dataURL = `${this.serverURL}/users/${contactId}`;
    return axios.put(dataURL, contact);
  }

  static deleteContact(contactId) {
    let dataURL = `${this.serverURL}/users/${contactId}`;
    return axios.delete(dataURL);
  }
}
