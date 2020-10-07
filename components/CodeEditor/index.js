import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Editor from 'react-simple-code-editor';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { rainbow } from 'react-syntax-highlighter/dist/esm/styles/hljs';

import css from '../../styles/editor.module.css';

function CodeEditor({ file, write }) {
  console.log(file, write);

  const [editorLoaded, setEditorLoaded] = useState(false);
  const [code, setCode] = useState('');
  const [fileName, setFileName] = useState('');

  useEffect(() => {
    file.text().then(data => {
      setCode(data);
      setEditorLoaded(true);
      setFileName(file.name.replace('/', ''));
    });
  }, [file]);

  const handleSaveBtn = () => {
    console.log(code);
    write(file, code);
  };

  return editorLoaded ? (
    <div className={css.editor}>
      <div className={css.editorNav}>
        <h4 className={css.fileName}>{fileName}</h4>
        <button onClick={handleSaveBtn} className={css.saveBtn}>
          Save File
        </button>
      </div>
      <Editor
        className={css.codeEditor}
        value={code}
        onValueChange={code => setCode(code)}
        highlight={code => {
          return (
            <SyntaxHighlighter language="javascript" style={rainbow}>
              {code}
            </SyntaxHighlighter>
          );
        }}
      />
    </div>
  ) : (
    <div> Loading Editor </div>
  );
}

CodeEditor.propTypes = {
  file: PropTypes.object,
  write: PropTypes.func
};

export default CodeEditor;
