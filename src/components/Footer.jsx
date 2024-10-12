import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  return (
    <footer className="bg-gray-600 text-gray-300 py-4 md:py-3">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
        <p className="text-sm">&copy; 2024 GeoProfiles. All rights reserved.</p>
        <div className="flex space-x-4">
          <a
            href="https://github.com/TusharGosavi23/GeoProfile.git"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="text-gray-300 hover:text-white transition-colors duration-300"
          >
            <FontAwesomeIcon className='bg-[#1a1a1a]' icon={faGithub} size="lg" />
          </a>
          <a
            href="https://www.linkedin.com/in/tushar-gosavi-121374261/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="text-gray-300 hover:text-white transition-colors duration-300"
          >
            <FontAwesomeIcon className='bg-[#1a1a1a]' icon={faLinkedin} size="lg" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
