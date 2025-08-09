import React from "react";
import Modal from "react-modal";

function ProjectModal({ project, onClose }) {
  return (
    <Modal
      isOpen={!!project}
      onRequestClose={onClose}
      contentLabel="Project Details"
      className="max-w-lg mx-auto mt-24 bg-white dark:bg-gray-900 p-6 rounded-lg shadow-xl outline-none"
      overlayClassName="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-start z-50"
    >
      {project && (
        <div className="text-gray-800 dark:text-white">
          <h2 className="text-2xl font-bold mb-2">{project.title}</h2>
          <p className="mb-4 text-sm text-gray-500">{project.tech}</p>
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-48 object-cover rounded mb-4"
          />
          <p className="mb-4 whitespace-pre-line">{project.description}</p>
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 underline hover:text-blue-700"
            >
              🔗 View on GitHub
            </a>
          )}
          <div className="mt-6 text-right">
            <button
              onClick={onClose}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </Modal>
  );
}

export default ProjectModal;
