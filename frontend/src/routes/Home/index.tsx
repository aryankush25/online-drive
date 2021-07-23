import React, { useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { isNilOrEmpty, isPresent } from '../../utils/helper';
import Header from './Header';
import addNewIcon from '../../assets/images/add_new_button.png';
import { sampleFiles } from '../../fakeData/filesData';
import FileFolder from './FileFolder';

import './styles.scss';
import AddNewModal from './AddNewModal';

const Home = () => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [files, setFiles] = useState(sampleFiles);
  const [selected, setSelected] = useState('');
  const [search, setSearch] = useState('');
  const { id } = useParams<{ id: string }>();

  const { data }: any = useMemo(() => {
    const foldersAndFiles = [];

    if (id === 'root') {
      for (const [key, value] of Object.entries(files)) {
        if (!value.parent) {
          foldersAndFiles.push({
            id: key,
            ...value,
          });
        }
      }
    } else {
      const folderData = files[id];

      if (isPresent(folderData) && !folderData.isFile) {
        return {
          data: (folderData.child || []).map((key: string) => {
            return {
              id: key,
              ...files[key],
            };
          }),
        };
      } else {
        return { data: null };
      }
    }

    return { data: foldersAndFiles };
  }, [id, files]);

  const searchResult = useMemo(() => {
    if (isNilOrEmpty(search)) return [];

    const keys = Object.keys(files);
    const searchResultLocal = [];

    keys.forEach((id: any) => {
      const file = files[id];

      if (file.name.toLowerCase().includes(search)) {
        searchResultLocal.push({ ...file, id });
      }
    });

    return searchResultLocal;
  }, [search, files]);

  return (
    <div className="drive-main-container">
      <Header files={files} search={search} searchCount={0} setSearch={setSearch} />

      {data === null ? (
        <div className="files-container">Invalid folder path</div>
      ) : isNilOrEmpty(search) ? (
        <div
          className="files-container"
          onClick={() => {
            setSelected('');
          }}>
          {data.map((file: any) => (
            <FileFolder
              key={file.id}
              file={file}
              selected={selected}
              setSearch={setSearch}
              setSelected={setSelected}
              setFiles={setFiles}
            />
          ))}

          <div className="file-container">
            <img
              className="add-new-icon"
              src={addNewIcon}
              alt="add-new-icon"
              onClick={() => {
                setIsOpen(true);
              }}
            />
          </div>
        </div>
      ) : (
        <div
          className="files-container"
          onClick={() => {
            setSelected('');
          }}>
          {searchResult.map((file: any) => (
            <FileFolder
              key={file.id}
              file={file}
              selected={selected}
              setSearch={setSearch}
              setSelected={setSelected}
              setFiles={setFiles}
            />
          ))}
        </div>
      )}

      <AddNewModal modalIsOpen={modalIsOpen} setIsOpen={setIsOpen} setFiles={setFiles} />
    </div>
  );
};

export default Home;
