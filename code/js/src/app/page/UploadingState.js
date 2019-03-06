import React from 'react';

import CentralLayout from '../layout/CentralLayout';
import UploadButton from '../ui/UploadButton';
import doUpload from '../domain/doUpload';

export default () =>
  <CentralLayout
    center={<UploadButton ok={doUpload} />}
  />
