import React, { useState, useEffect, useRef } from "react";
import { Modal } from "react-bootstrap";
import { colorList } from "../constants/listcolor.js";
import Spinner from "react-bootstrap/Spinner";
import contacts from "../constants/contacts.json";
import usContacts from "../constants/usContacts.json";
import CustomButton from "./CustomButton.jsx";

export default function CustomModal({
  show,
  onHide,
  closeModal,
  openModal,
  data,
  loader,
  setLoader,
  getContactList,
  setData,
}) {
  const [checked, setChecked] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [detail, setDetail] = useState(null);
  const containerRef = useRef(null);
  const path = window.location.pathname.split("/");

  const handleSearchInputChange = (e) => {
    console.log(e.target.value);
    setSearchQuery(e.target.value);
  };

  useEffect(() => {
    const container = containerRef.current;
    const handleScroll = () => {
      if (
        container &&
        container.scrollTop + container.clientHeight >=
          container.scrollHeight - 10
      ) {
        console.log("i reach at the bottom ...");
      }
    };
    if (container) {
      container.addEventListener("scroll", handleScroll);
    }
    return () => {
      if (container) {
        container.removeEventListener("scroll", handleScroll);
      }
    };
  }, [data]);

  return (
    <Modal
      show={show}
      onHide={onHide}
      backdrop="static"
      size="xl"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">{path}</Modal.Title>
        {!detail && (
          <>
            <input
              type="text"
              placeholder="Search by email"
              value={searchQuery}
              onChange={handleSearchInputChange}
              className="border-1 shadow px-2"
            />
            <div className="d-flex">
              <CustomButton
                name={"All Contacts"}
                onClick={() => {
                  openModal("all-contacts");
                  // getContactList("171");
                  setData(contacts);
                }}
                buttonStyle={"allContact"}
              />
              <CustomButton
                name={"US Contacts"}
                onClick={() => {
                  openModal("us-contacts");
                  setData(usContacts);
                }}
                buttonStyle={"usContact"}
              />
            </div>
          </>
        )}
        <CustomButton
          name={"close"}
          onClick={() => {
            closeModal();
            setDetail(null);
          }}
          buttonStyle={"closeBtn"}
        />
      </Modal.Header>
      <Modal.Body
        className={!detail ? "modalContactBody" : ""}
        ref={containerRef}
      >
        {!detail ? (
          <>
            <h4 className="mx-2">Contact List</h4>
            {!loader ? (
              <>
                {data &&
                  Object.values(data)
                    .filter(
                      (item, index) =>
                        (!checked || index % 2 === 0) &&
                        (!item.email ||
                          searchQuery.trim() === "" ||
                          item.email
                            .toLowerCase()
                            .includes(searchQuery.toLowerCase()))
                    )
                    .map((item, index) => (
                      <a
                        href="#"
                        className={`list-group-item list-group-item-action ${
                          colorList[index % 7]
                        }`}
                        key={index}
                        onClick={(e) => {
                          e.preventDefault();
                          setDetail(item);
                        }}
                      >
                        {item?.email || "Email not available"}{" "}
                        <div>{item.phone_number}</div>
                      </a>
                    ))}
              </>
            ) : (
              <Spinner animation="border" variant="danger" />
            )}
          </>
        ) : (
          <>
            <div>{detail.email}</div>
            <div>{detail.phone_number}</div>
          </>
        )}
      </Modal.Body>
      <Modal.Footer className="modalFooter">
        {!detail && (
          <div className="form-check d-flex align-items-center">
            <input
              className="form-check-input"
              type="checkbox"
              id="defaultCheck1"
              onChange={(e) => setChecked(e.target.checked)}
            />
            <label className="form-check-label" for="defaultCheck1">
              Even countries
            </label>
          </div>
        )}
      </Modal.Footer>
    </Modal>
  );
}
