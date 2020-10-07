import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import SimpleMDE from 'react-simplemde-editor';

import css from '../../styles/editor.module.css';

function MarkdownEditor({ file, write }) {
  console.log(file, write);

  const [editorLoaded, setEditorLoaded] = useState(false);
  const [mdeValue, setMdeValue] = useState('');
  const [fileName, setFileName] = useState('');

  useEffect(() => {
    file.text().then(data => {
      setMdeValue(data);
      setEditorLoaded(true);
      setFileName(file.name.replace('/', ''));
    });
  }, [file]);

  const handleChange = ({ value }) => {
    console.log(value);
    setMdeValue(value);
  };

  const handleSaveBtn = () => {
    console.log(mdeValue);
    write(file, mdeValue);
  };

  return editorLoaded ? (
    <div className={css.editor}>
      <div className={css.editorNav}>
        <h4 className={css.fileName}>{fileName}</h4>
        <button onClick={handleSaveBtn} className={css.saveBtn}>
          Save File
        </button>
      </div>
      <SimpleMDE value={mdeValue} onChange={e => handleChange(e)} />
    </div>
  ) : (
    <div> Loading Editor </div>
  );
}

MarkdownEditor.propTypes = {
  file: PropTypes.object,
  write: PropTypes.func
};

export default MarkdownEditor;
