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

const FileFolder = ({ files, selected, setSelected }) => {
  const history = useHistory();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (selected !== files.id) {
      setIsMenuOpen(false);
    }
  }, [selected]);

  const ref = useDetectClickOutside({
    onTriggered: () => {
      setIsMenuOpen(false);
    },
  });

  return (
    <div
      ref={ref}
      className={`file-container ${selected === files.id ? 'file-container-selected' : ''}`}
      onClick={(e) => {
        e.stopPropagation();
        if (selected === files.id && !files.isFile) {
          history.push(`/drive/${files.id}`);
        } else {
          setSelected(files.id);
        }
      }}
      onContextMenu={(e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsMenuOpen(true);
        setSelected(files.id);
      }}>
      <img src={files.isFile ? fileIcon : folderIcon} alt="folder-file-icon" />

      {files.isFile && <div className="file-extension">.jpg</div>}

      <div className="file-name">{files.name}</div>

      {isMenuOpen && (
        <div className="menu-container">
          {options.map((option) => {
            return (
              <div
                key={option.value}
                className="menu-option-container"
                onClick={() => {
                  console.log('#### option.value', option.value);
                }}>
                <span className={option.value === 'delete' && 'menu-option-danger-label'}>{option.label}</span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
export default FileFolder;
