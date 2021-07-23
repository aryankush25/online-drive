import React, { useCallback, useMemo } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import backIcon from '../../assets/images/arrow_back_black_48dp.svg';
import { isNilOrEmpty, isPresent } from '../../utils/helper';

const getPath = (files, folder, pathArray = []) => {
  if (folder.parent === null) {
    pathArray.push({
      gotoRoute: 'root',
      label: 'Root',
    });

    return pathArray;
  }
  const id = folder.parent;
  const data = files[id];

  pathArray.push({ gotoRoute: id, label: data.name });

  return getPath(files, data, pathArray);
};

const Header = ({ files, search, searchCount = 0, setSearch }) => {
  const { id } = useParams<{ id: string }>();
  const history = useHistory();

  const { isOnRoot, breadCrumbsArray } = useMemo(() => {
    const isOnRoot = id === 'root';
    const breadCrumbsArray = [];

    const currentFolder = files[id];

    if (!isOnRoot && isPresent(currentFolder)) {
      getPath(files, currentFolder, breadCrumbsArray);

      breadCrumbsArray.reverse();

      breadCrumbsArray.push({
        gotoRoute: id,
        label: currentFolder.name,
      });
    } else {
      breadCrumbsArray.push({
        gotoRoute: 'root',
        label: 'Root',
      });
    }

    return {
      isOnRoot,
      breadCrumbsArray,
    };
  }, [id, files]);

  const handleInputChange = useCallback(
    (e) => {
      setSearch(e.target.value);
    },
    [setSearch],
  );

  return (
    <div className="header-container">
      <div className="header-inner-container">
        {isNilOrEmpty(search) ? (
          <div className="left-container">
            <div
              className={`action-button-icon ${isOnRoot ? 'action-button-icon-disabled' : ''}`}
              onClick={() => {
                !isOnRoot && history.goBack();
              }}>
              <img src={backIcon} alt="back" width="100%" height="100%" />
            </div>
            <div className="breadcrumbs-container">
              {breadCrumbsArray.map((data, index) => {
                const current = data.gotoRoute === id;

                return (
                  <div key={data.gotoRoute} className="breadcrumb-container">
                    <span
                      className={`breadcrumb-label ${current ? 'breadcrumb-label-current' : ''}`}
                      onClick={() => {
                        if (!current) {
                          history.push(`/drive/${data.gotoRoute}`);
                        }
                      }}>
                      {data.label}
                    </span>

                    {!current && <div className="breadcrumb-divider">/</div>}
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="left-container">Fount results: {searchCount} items</div>
        )}

        <div className="right-container">
          <input
            value={search}
            className="search"
            name="search"
            placeholder="Search for anything"
            onChange={handleInputChange}
          />
        </div>
      </div>
    </div>
  );
};

export default Header;
