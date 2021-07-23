import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Modal from 'react-modal';
import { v4 as uuidv4 } from 'uuid';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px',
  },
};

const AddNewModal = ({ modalIsOpen, setIsOpen, setFiles }) => {
  const [fileName, setFileName] = useState('');
  const [isFile, setIsFile] = useState(false);
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    if (!modalIsOpen) {
      setFileName('');
      setIsFile(false);
    }
  }, [modalIsOpen]);

  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={() => {
        setIsOpen(false);
      }}
      style={customStyles}
      contentLabel="Add new Modal">
      <div className="modal-container">
        <div className="modal-label">Create New</div>

        <div className="modal-radio-button">
          <button
            className={`radio-select ${isFile ? 'radio-select-selected' : ''}`}
            onClick={() => {
              setIsFile(true);
            }}>
            File
          </button>
          <button
            className={`radio-select ${isFile ? '' : 'radio-select-selected'}`}
            onClick={() => {
              setIsFile(false);
            }}>
            Folder
          </button>
        </div>

        <div className="modal-input-container">
          <input
            value={fileName}
            className="fileName"
            name="fileName"
            onChange={(e) => {
              setFileName(e.target.value);
            }}
          />
        </div>

        <button
          className="create-button"
          onClick={() => {
            console.log('Create');

            setFiles((files) => {
              let newFiles = { ...files };

              console.log('#### newFiles', newFiles);

              const idForNewFile = uuidv4();

              newFiles[idForNewFile] = {
                parent: id,
                name: fileName,
                isFile: isFile,
              };

              if (id !== 'root') {
                newFiles[idForNewFile] = {
                  parent: id,
                  name: fileName,
                  isFile: isFile,
                };
                newFiles[id].child = [...(newFiles[id].child || []), idForNewFile];
              } else {
                newFiles[idForNewFile] = {
                  parent: null,
                  name: fileName,
                  isFile: isFile,
                };
              }

              return newFiles;
            });

            setIsOpen(false);
          }}>
          Create
        </button>
      </div>
    </Modal>
  );
};

export default AddNewModal;
