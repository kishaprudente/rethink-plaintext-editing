import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import css from './style.css';
import ReactMarkdown from 'react-markdown';

function MarkdownEditor({ file, write }) {
  console.log(file, write);

  const [editorLoaded, setEditorLoaded] = useState(false);
  const [value, setValue] = useState('');
  const [fileName, setFileName] = useState('');

  useEffect(() => {
    file.text().then(data => {
      setValue(data);
      setEditorLoaded(true);
      setFileName(file.name.replace('/', ''));
    });
  }, [file]);

  return editorLoaded ? (
    <div className={css.editor}>
      <h3>{fileName}</h3>
      <ReactMarkdown source={value} />
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
