import React, { useCallback, useMemo } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import AsyncSelect from 'react-select/async';

import backIcon from '../../assets/images/arrow_back_black_48dp.svg';

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

const Header = ({ files }) => {
  const { id } = useParams<{ id: string }>();
  const history = useHistory();

  const { isOnRoot, breadCrumbsArray } = useMemo(() => {
    const isOnRoot = id === 'root';
    const breadCrumbsArray = [];

    if (!isOnRoot) {
      const currentFolder = files[id];

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

  const loadOptions = useCallback((inputValue: string, callback: Function) => {
    setTimeout(() => {
      callback([]);
    }, 1000);
  }, []);

  const handleInputChange = useCallback((newValue: string) => {
    console.log('Hello');
  }, []);

  return (
    <div className="header-container">
      <div className="header-inner-container">
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

        <div className="right-container">
          <AsyncSelect cacheOptions loadOptions={loadOptions} defaultOptions onInputChange={handleInputChange} />
        </div>
      </div>
    </div>
  );
};

export default Header;
