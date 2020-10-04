import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import SimpleMDE from 'react-simplemde-editor';

import css from '../../styles/MarkdownEditor.module.css';

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

  return editorLoaded ? (
    <div className={css.editor}>
      <h3>{fileName}</h3>
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
