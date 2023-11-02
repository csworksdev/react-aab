import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { Table, Button, Modal } from "react-bootstrap";
import { useLocation } from "react-router-dom";

function UniversityList() {
  const [universities, setUniversities] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedUniversity, setSelectedUniversity] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    axios
      .get("http://universities.hipolabs.com/search?country=Indonesia")
      .then((response) => {
        setUniversities(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const handleRowClick = (university, index) => {
    setSelectedUniversity(university);
    setSelectedIndex(index + 1);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  };

  return (
    <div>
      <p>Welcome, {useQuery().get("username")}</p>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Web Pages</th>
          </tr>
        </thead>
        <tbody>
          {universities.map((university, index) => (
            <tr
              key={university.name}
              onClick={() => handleRowClick(university, index)}
            >
              <td>{index + 1}</td>
              <td>{university.name}</td>
              <td>
                {university.web_pages.map((page) => (
                  <div key={page}>
                    <a href={page} target="_blank" rel="noopener noreferrer">
                      {page}
                    </a>
                  </div>
                ))}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={closeModal}>
        {/* <Modal.Header closeButton>
          <Modal.Title>University Details</Modal.Title>
        </Modal.Header> */}
        <Modal.Body>
          {selectedUniversity && (
            <div>
              <p>
                <strong>No:</strong> {selectedIndex}
              </p>
              <p>
                <strong>Name:</strong> {selectedUniversity.name}
              </p>
              <p>
                <strong>Web Pages:</strong>
                {selectedUniversity.web_pages.map((page) => (
                  <a href={page} target="_blank" rel="noopener noreferrer">
                    {page}
                  </a>
                ))}
              </p>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default UniversityList;
