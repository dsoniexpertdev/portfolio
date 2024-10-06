import React, { useState, useEffect, useRef  } from 'react';
import Masonry from 'masonry-layout';
import $ from 'jquery';
import Modal from 'react-modal';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import Badge from 'react-bootstrap/Badge';
import Stack from 'react-bootstrap/Stack';
import Card from 'react-bootstrap/Card';

import '../css/Portfolio.css';
import profile_pic from "../images/dinesh-soni-web.webp";
import icon1 from "../images/icone1.svg";
import icon2 from "../images/icone2.svg";
import icon3 from "../images/icone3.svg";


//MD5 hashes
// all = a181a603769c1f98ad927e7367c7aa51
// core-php = 297128ce39f412d5eb2000dc5790cf91
// php = e1bfd762321e409cee4ac0b6e841963c
// ror = 993a7ae7a863813cf95028b50708e222
// react = 266a1f7c2e2345169d3bc448da45eae6

const Portfolio = () => {
  const [portfolioData, setPortfolioData] = useState({});
  const [selectedTab, setSelectedTab] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const apiCalled = useRef(false);
  const [session, setSession] = useState('');
  const apiUrl = 'https://www.techmits.com/api-v1/';

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const sessionParam = params.get('session');
    setSession(sessionParam);

    //console.log('Session:', sessionParam);
    // You can now use `sessionParam` in your logic
  }, []);


  useEffect(() => {
    if (!apiCalled.current) {
      apiCalled.current = true;
      fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
          console.log(data);
          setPortfolioData(data || {});
        })
        .catch(error => {
          console.error('Error fetching portfolio data:', error);
        });
    }
  }, []);

  useEffect(() => {
    if (portfolioData.records && portfolioData.records.length > 0) {
      const images = document.querySelectorAll('img'); // select all images
      let loadedImages = 0;
      // Apply masonry after all images have loaded
      images.forEach((img) => {
        applyMasonry(500);

        img.onerror = () => {
          // Handle the error if an image fails to load
          console.error("Image failed to load");
          //loadedImages++;
            applyMasonry(500); // Even if one fails, continue after all are attempted
        };
      });
    }
  }, [portfolioData]);

  const applyMasonry = (time) => {
    setTimeout(() => {
   var msnry = new Masonry('.portfolio-grid', {
        itemSelector: '.portfolio-item',
        columnWidth: '.portfolio-item',
        percentPosition: true,
        transitionDuration: '0.8s',
        stagger: 30
        // columnWidth: 200
      });

    }, time);
  }

  const handleTabClick = (technology) => {
    setSelectedTab(technology);
    applyMasonry(500);
  };

  const openModal = (project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  function getRecordsByCategorySlug(data, selectedSlug) {
    if(!data.records){
      return [];
    }
    //selectedSlug = 'all';
    if(selectedSlug == 'all'){
      return data.records;
    }
    return data.records.filter(record =>
      record.cate.some(category => category.slug === selectedSlug)
    );
  }

  return (
    <Container id='portfolioAppMain'>
      <div className='hero-section'>
        <Row>
          <Col md={6}>
            <div className='header-left hero-text wow fadeInUp'>
              <span>Hi, I'm </span>
              <h1>Dinesh Soni</h1>
              <h3>Full Stack Ruby On Rails Expert</h3>
              <p>Ruby on Rails expert with over 12 years of experience in building and scaling high-performance web applications.
                I specialize in creating robust, scalable solutions with a strong focus on cloud infrastructure (AWS) and DevOps.
                My passion is transforming complex ideas into efficient, maintainable systems that drive business success.
                Let’s collaborate to bring your vision to life with top-tier development expertise.</p>
            </div>
          </Col>
          <Col md={6} >
            <div className='hero-img'>
              <img src={profile_pic} alt='' />
            </div>
          </Col>
        </Row>
        <Row>
          <div className='col-md-12 text-left p-0'>
            <section className='support-section wow fadeInUp'>
              <div className='support-items'>
                <div className='row'>
                  <div className='col-md-4 support-item'>
                    <div className="support-icon">
                      <img src={icon1} />
                    </div>
                    <div className="support-text">
                      <h3>10+ years job</h3>
                      <p>Experience</p>
                    </div>
                  </div>
                  <div className='col-md-4 support-item'>
                    <div className="support-icon">
                    <img src={icon2} />
                    </div>
                    <div className="support-text">
                      <h3>300+ Projects</h3>
                      <p>Completed</p>
                    </div>
                  </div>
                  <div className='col-md-4 support-item'>
                    <div className="support-icon">
                    <img src={icon3} />
                    </div>
                    <div className="support-text">
                      <h3>Online 24/7</h3>
                      <p>Support</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </Row>
      </div>


      <div className='portfolio-container'>
        <div className="tabs">
          <button  className={`tab ${selectedTab === 'all'? 'active' : ''}`}
          onClick={() => handleTabClick('all')}
          >All</button>
          {portfolioData && portfolioData.categories && portfolioData.categories.map((technology) => (
            <button
              key={technology.slug}
              className={`tab ${selectedTab === technology.slug ? 'active' : ''}`}
              onClick={() => handleTabClick(technology.slug)}
            >
              {technology.name}
            </button>
          ))}
        </div>

        <div className="portfolio-grid" >
          {portfolioData && getRecordsByCategorySlug(portfolioData, selectedTab).map((project, index) => (
            <div
              key={index}
              className="portfolio-item grid-item"
              onClick={() => openModal(project)}
              style={{background: 'url('+project.thumb+')',"backgroundPosition": "center","backgroundSize": "cover"}}>
              <div className='portfoloItemInner'>
                <a><h1><span>{project.project_fields.project_name}</span></h1></a>

                <div className='imgwrapper'>
                </div>
                <div className="d-flex justify-content-around">
                  <Card style={{ width: '100%' }}>
                    <Card.Body>
                      <Card.Title>Card Title</Card.Title>
                      <Row>
                        <Col md={12} sm={8}>
                          <ul className='techlists'>
                            {project.project_fields.custom_tag_two.split('|').map((tech, index) => (
                              <li key={index}>{tech.trim()}</li>
                            ))}
                          </ul>
                        </Col>
                        <Col md={12} sm={12}>
                          <div className="project-item">
                            <h2>{project.title}</h2>
                            <h3>{project.project_fields.title}</h3>
                          </div>
                        </Col>
                        <Col md={12}>
                          <div className='techSkillwrappper'>
                            <h4>Technology used: </h4>
                            <Stack direction="horizontal" gap={2} className='techskills'>
                              {project.project_fields.client_name.split(',').map((tech, index) => (
                                <Badge bg="primary" key={index} className='ml-1 '>{tech.trim()}</Badge>
                              ))}
                            </Stack>
                          </div>
                        </Col>
                        <Col md={12} sm={12}>
                          <div className='tagsWrapper'>
                            {project.tags.map((tag, index) => (
                              <span key={index}>{tag.name}</span>
                            ))}
                          </div>
                        </Col>
                      </Row>
                    </Card.Body>
                  </Card>
                </div>
              </div>
            </div>
          ))}
        </div>
          <Modal
            isOpen={isModalOpen}
            onRequestClose={closeModal}
            className="modal show d-block"
            overlayClassName="overlay"
            role={'dialog'}
            tabIndex="-1"
            appElement={document.getElementById('root')}
            >
          <div className="modal-dialog-sm model-container" role="document">
          {selectedProject && (
            <div className="modal-content">
              <button onClick={closeModal} className="close-button">X</button>
              <h1 className='heading_before titleh3'>
                <div className='heding_section_hover'>
                  <div className="circle" style={{ animationDelay: '-3s' }}></div>
                  <div className="circle" style={{ animationDelay: '-2s' }}></div>
                  <div className="circle" style={{ animationDelay: '-1s' }}></div>
                  <div className="circle" style={{ animationDelay: '-0s' }}></div>
                </div>
                {selectedProject.project_fields.project_name}
              </h1>
              <div className='description'>
                {selectedProject.project_fields.custom_tag_one}
              </div>
              <div className="image-wrapper"><img src={selectedProject.full_image || selectedProject.thumb} alt={selectedProject.title} /></div>
              <p className='project-btn-wrapper'>
                {selectedProject.project_fields.ext_url ? (
                  <a className='btn-project' href={selectedProject.project_fields.ext_url} target="_blank" rel="noopener noreferrer">
                    <span>VIEW PROJECT</span>
                  </a>
                ) : (
                  <span>Confidential</span>
                )}

              </p>
              <p>{selectedProject.description}</p>

              <div
                className="project-content"
                dangerouslySetInnerHTML={{ __html: selectedProject.content }}>
              </div>
            </div>

          )}
          </div>
          </Modal>

      </div>


      </Container>
  );
};

export default Portfolio;
