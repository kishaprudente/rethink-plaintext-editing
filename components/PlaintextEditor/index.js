import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import css from '../../styles/editor.module.css';

//CKEDITOR
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

function PlaintextEditor({ file, write }) {
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

  const handleSaveBtn = () => {
    console.log(content);
    write(file, content);
  };

  const handleChangeContent = (event, editor) => {
    const data = editor.getData();
    console.log({ event, editor, data });
    setContent(data);
  };

  return editorLoaded ? (
    <div className={css.editor}>
      <div className={css.editorNav}>
        <h4 className={css.fileName}>{fileName}</h4>
        <button onClick={handleSaveBtn} className={css.saveBtn}>
          Save File
        </button>
      </div>
      <CKEditor
        editor={ClassicEditor}
        data={content}
        onChange={(event, editor) => handleChangeContent(event, editor)}
      />
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
