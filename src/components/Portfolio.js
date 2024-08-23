import React, { useState } from 'react';
import Masonry from 'masonry-layout';
import $ from 'jquery';
import Modal from 'react-modal';
import '../css/Portfolio.css';

const portfolioData = {
  "React": [
    {
      title: "Project 1",
      image_thumb: "/images/portfolio/thumb/project1.jpg",
      image_full: "/images/portfolio/thumb/project1.jpg",
      description: "This is a description of Project 1.",
      technologies: "React, Node.js, MongoDB",
      moreInfo: "More detailed information about Project 1."
    },
    {
      title: "Project 2",
      image_thumb: "/images/portfolio/thumb/project2.jpg",
      image_full: "/images/portfolio/thumb/project2.jpg",
      description: "This is a description of Project 2.",
      technologies: "React, Redux, Firebase",
      moreInfo: "More detailed information about Project 2."
    }
  ],
  "Node.js": [
    {
      title: "Project 3",
      image_thumb: "/images/portfolio/thumb/project3.jpg",
      image_full: "/images/portfolio/thumb/project3.jpg",
      description: "This is a description of Project 3.",
      technologies: "Node.js, Express, MongoDB",
      moreInfo: "More detailed information about Project 3."
    }
  ]
};

const Portfolio = () => {
  const [selectedTab, setSelectedTab] = useState('React');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  const handleTabClick = (technology) => {
    setSelectedTab(technology);
    setTimeout(() => {
      new Masonry('.portfolio-grid', {
        itemSelector: '.portfolio-item',
        columnWidth: '.portfolio-item',
        percentPosition: true
      });
    }, 0);
  };

  const openModal = (project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="portfolio-container">
      <div className="tabs">
        {Object.keys(portfolioData).map((technology) => (
          <button
            key={technology}
            className={`tab ${selectedTab === technology ? 'active' : ''}`}
            onClick={() => handleTabClick(technology)}
          >
            {technology}
          </button>
        ))}
      </div>

      <div className="portfolio-grid">
        {portfolioData[selectedTab].map((project, index) => (
          <div
            key={index}
            className="portfolio-item"
            onClick={() => openModal(project)}
          >
            <img src={project.image_thumb} alt={project.title} />
            <div class="project-item">
              <h3>{project.title}</h3>
              <p><strong>Technologies Used:</strong> {project.technologies}</p>
            </div>
          </div>
        ))}
      </div>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        className="modal"
        overlayClassName="overlay"
      >
        {selectedProject && (
          <div className="modal-content">
            <button onClick={closeModal} className="close-button">X</button>
            <h2>{selectedProject.title}</h2>
            <div class="image-wrapper"><img src={selectedProject.image_full} alt={selectedProject.title} /></div>
            <p><strong>Description:</strong> {selectedProject.description}</p>
            <p><strong>Technologies Used:</strong> {selectedProject.technologies}</p>
            <p><strong>More Info:</strong> {selectedProject.moreInfo}</p>

          </div>
        )}
      </Modal>
    </div>
  );
};

export default Portfolio;
