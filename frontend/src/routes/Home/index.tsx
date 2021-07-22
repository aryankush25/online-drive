import React, { useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { isPresent } from '../../utils/helper';
import Header from './Header';
import addNewIcon from '../../assets/images/add_new_button.png';
import { sampleFiles } from '../../fakeData/filesData';
import FileFolder from './FileFolder';

import './styles.scss';

const Home = () => {
  const [selected, setSelected] = useState('');
  const { id } = useParams<{ id: string }>();

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
          {data.map((files: any) => (
            <FileFolder key={files.id} files={files} selected={selected} setSelected={setSelected} />
          ))}

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
