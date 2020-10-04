import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import css from '../../styles/PlaintextEditor.module.css';

//CKEDITOR
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

function PlaintextEditor({ file, write }) {
  console.log(file, write);

  const [editorLoaded, setEditorLoaded] = useState(false);
  const [content, setContent] = useState('');
  const [fileName, setFileName] = useState('');

  useEffect(() => {
    file.text().then(data => {
      setContent(data);
      setEditorLoaded(true);
      setFileName(file.name.replace('/', ''));
    });
  }, [file]);

  return editorLoaded ? (
    <div className={css.editor}>
      <h4 className={css.fileName}>{fileName}</h4>
      <CKEditor editor={ClassicEditor} data={content} />
    </div>
  ) : (
    <div> Loading Editor </div>
  );
}

PlaintextEditor.propTypes = {
  file: PropTypes.object,
  write: PropTypes.func
};

export default PlaintextEditor;
