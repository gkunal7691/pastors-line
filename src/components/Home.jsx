import React, { useEffect, useState } from "react";
import CustomModal from "./CustomModal";
import { useGetContacts } from "../services/useGetContacts";
import contacts from "../constants/contacts.json";
import usContacts from "../constants/usContacts.json";
import CustomButton from "./CustomButton";

export default function Home() {
  const getContacts = useGetContacts();
  let url = "";
  const [modalShow, setModalShow] = useState(false);
  const [loader, setLoader] = useState(false);
  const [data, setData] = useState();
  const openModal = (path) => {
    url = path;
    setModalShow(true);
    window.history.pushState(null, null, url);
  };
  const closeModal = () => {
    setModalShow(false);
    window.history.replaceState(null, null, "/");
  };

  const getContactList = async (country) => {
    try {
      setLoader(true);
      const res = await getContacts(country);
      if (res) setData(res.contacts);
    } catch (error) {
      console.log("hello peter parker..", error);
      setLoader(false);
    } finally {
      setLoader(false);
    }
  };

  return (
    <>
      <div className="w-100 h-100 d-flex justify-content-center aligns-items-center ">
        <div className=" align-self-center ">
          <CustomButton
            name={"Button A"}
            onClick={() => {
              openModal("all-contacts");
              // getContactList("171");
              setData(contacts);
            }}
            buttonStyle={"btn-warning"}
          />
        </div>
        <div className=" align-self-center">
          <CustomButton
            name={"Button B"}
            onClick={() => {
              openModal("us-contacts");
              //   getContactList("226");
              setData(usContacts);
            }}
            buttonStyle={"btn-primary"}
          />
        </div>
        <CustomModal
          show={modalShow}
          onHide={() => setModalShow(false)}
          closeModal={closeModal}
          openModal={openModal}
          data={data}
          loader={loader}
          setLoader={setLoader}
          getContactList={getContactList}
          setData={setData}
        />
      </div>
    </>
  );
}
