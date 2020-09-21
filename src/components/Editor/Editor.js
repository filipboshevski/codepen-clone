import React, { useState } from 'react';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';
import 'codemirror/mode/xml/xml';
import 'codemirror/mode/css/css';
import 'codemirror/mode/javascript/javascript';
import { Controlled as ControlledEditor } from 'react-codemirror2';
import './Editor.styles.scss';

import { EditorContainer, EditorTopBar, EditorTitle } from './Editor.styles';

const Editor = (props) => {
    const { displayName, mode, value, onChange } = props;

    const handleChange = (editor, data, value) => {
        onChange(value);
    }

    const [collapse, setCollapse] = useState(false);

    return (
        <EditorContainer collapse={collapse}>
            <EditorTopBar>
                <EditorTitle>{displayName}</EditorTitle>
                <button className='toggle' type='button' onClick={() => setCollapse(!collapse)}>
                    <img alt='arrow' src='./arrow-down-sign-to-navigate.png' />
                </button>
            </EditorTopBar>
            <ControlledEditor 
              onBeforeChange={handleChange}
              value={value}
              className="code-mirror-wrapper"
              options={{
                lineWrapping: true,
                lint: true,
                mode,
                lineNumbers: true,
                theme: 'material'
              }}
            />
        </EditorContainer>
    )
};

export default Editor;