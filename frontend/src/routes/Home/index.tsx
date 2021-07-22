import React, { useMemo, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { isPresent } from '../../utils/helper';
import Header from './Header';
import fileIcon from '../../assets/images/file.png';
import folderIcon from '../../assets/images/folder.png';
import addNewIcon from '../../assets/images/add_new_button.png';
import { sampleFiles } from '../../fakeData/filesData';

import './styles.scss';

const Home = () => {
  const [selected, setSelected] = useState('');
  const { id } = useParams<{ id: string }>();
  const history = useHistory();

  const { data }: any = useMemo(() => {
    const foldersAndFiles = [];

    if (id === 'root') {
      for (const [key, value] of Object.entries(sampleFiles)) {
        if (!value.parent) {
          foldersAndFiles.push({
            id: key,
            ...value,
          });
        }
      }
    } else {
      const folderData = sampleFiles[id];

      if (isPresent(folderData) && !folderData.isFile) {
        return {
          data: (folderData.child || []).map((key: string) => {
            return {
              id: key,
              ...sampleFiles[key],
            };
          }),
        };
      } else {
        return { data: null };
      }
    }

    return { data: foldersAndFiles };
  }, [id]);

  return (
    <div className="drive-main-container">
      <Header />

      {data === null ? (
        <div className="files-container">Invalid folder path</div>
      ) : (
        <div
          className="files-container"
          onClick={() => {
            setSelected('');
          }}>
          {data.map((files: any) => {
            return (
              <div
                key={files.id}
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
                  console.log('#### e', e);
                }}>
                <img src={files.isFile ? fileIcon : folderIcon} alt="folder-file-icon" />

                {files.isFile && <div className="file-extension">.jpg</div>}

                <div className="file-name">{files.name}</div>
              </div>
            );
          })}

          <div className="file-container">
            <img
              className="add-new-icon"
              src={addNewIcon}
              alt="add-new-icon"
              onClick={() => {
                console.log('Add new');
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
