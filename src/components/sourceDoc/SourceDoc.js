import React, { useEffect, useState } from 'react'
import { TopPaneContainer } from './TopPane.styles';
import Editor from '../Editor/Editor';
import './SourceDoc.scss';
import { connect } from 'react-redux';
import { updateCss, updateHtml, updateJs } from '../../redux/sourceDoc/SourceDocActions';

const SourceDoc = ({updateHtml, updateCss, updateJs}) => {
    const [html, setHtml] = useState('');
    const [css, setCss] = useState('');
    const [js, setJs] = useState('');
    const [srcDoc, setSrcDoc] = useState('');
    
    useEffect(() => {
        const timeout = setTimeout(() => {
            setSrcDoc(`
                <html>
                    <body>${html}</body>
                    <style>${css}</style>
                    <script>${js}</script>
                </html>
            `);
            
        }, 300);

        const reduxTimeout = setTimeout(() => {
            updateHtml(html);
            updateCss(css);
            updateJs(js);
        }, 2000);

        return () => {
            clearTimeout(timeout);
            clearTimeout(reduxTimeout);
        }
    });

    return (
        <div>
            <TopPaneContainer>
                <Editor displayName='HTML' mode='xml' value={html} onChange={setHtml}/>
                <Editor displayName='CSS' mode='css' value={css} onChange={setCss} />
                <Editor displayName='JS' mode='js' value={js} onChange={setJs} />
            </TopPaneContainer>
            <div className='pane'>
                <iframe
                    title="output"
                    sandbox="allow-scripts allow-modals"
                    frameBorder="0"
                    width="100%"
                    height="100%"
                    srcDoc={srcDoc}
                />
            </div>
        </div>
    )
};

const mapDispatchToProps = dispatch => ({
    updateHtml: html => dispatch(updateHtml(html)),
    updateCss: css => dispatch(updateCss(css)),
    updateJs: js => dispatch(updateJs(js))
})

export default connect(null, mapDispatchToProps)(SourceDoc);
