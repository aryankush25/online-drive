import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDetectClickOutside } from 'react-detect-click-outside';
import fileIcon from '../../assets/images/file.png';
import folderIcon from '../../assets/images/folder.png';

const options = [
  { value: 'copy', label: 'Copy' },
  { value: 'rename', label: 'Rename' },
  { value: 'delete', label: 'Delete' },
];

const FileFolder = ({ file, selected, setSelected, setFiles }) => {
  const history = useHistory();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (selected !== file.id) {
      setIsMenuOpen(false);
    }
  }, [selected, file.id]);

  const ref = useDetectClickOutside({
    onTriggered: () => {
      setIsMenuOpen(false);
    },
  });

  return (
    <div
      ref={ref}
      className={`file-container ${selected === file.id ? 'file-container-selected' : ''}`}
      onClick={(e) => {
        e.stopPropagation();
        if (selected === file.id && !file.isFile) {
          history.push(`/drive/${file.id}`);
        } else {
          setSelected(file.id);
        }
      }}
      onContextMenu={(e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsMenuOpen(true);
        setSelected(file.id);
      }}>
      <img src={file.isFile ? fileIcon : folderIcon} alt="folder-file-icon" />

      {file.isFile && <div className="file-extension">.jpg</div>}

      <div className="file-name">{file.name}</div>

      {isMenuOpen && (
        <div className="menu-container">
          {options.map((option) => {
            return (
              <div
                key={option.value}
                className="menu-option-container"
                onClick={(e) => {
                  e.stopPropagation();

                  if (option.value === 'delete') {
                    setFiles((files) => {
                      let newFiles = { ...files };

                      const fileToDeleteParent = newFiles[file.id].parent;

                      delete newFiles[file.id];

                      if (fileToDeleteParent !== null) {
                        newFiles[fileToDeleteParent] = {
                          ...newFiles[fileToDeleteParent],
                          child: newFiles[fileToDeleteParent].child.filter((id) => {
                            return file.id !== id;
                          }),
                        };
                      }

                      return newFiles;
                    });
                  }
                }}>
                <span className={option.value === 'delete' ? 'menu-option-danger-label' : ''}>{option.label}</span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
export default FileFolder;
