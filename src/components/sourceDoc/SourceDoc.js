import React, { useEffect, useState } from 'react'
import { TopPaneContainer } from './TopPane.styles';
import Editor from '../Editor/Editor';
import './SourceDoc.scss';
import { connect } from 'react-redux';
import { updateCss, updateHtml, updateJs } from '../../redux/sourceDoc/SourceDocActions';
import { createStructuredSelector } from 'reselect';
import { selectCurrentUser } from '../../redux/user/userSelectors';

const SourceDoc = ({currentUser, updateHtml, updateCss, updateJs}) => {
    const [html, setHtml] = useState('');
    const [css, setCss] = useState('');
    const [js, setJs] = useState('');
    const [srcDoc, setSrcDoc] = useState('');
    const [collapsedDivs, setCollapsedDivs] = useState(0);

    useEffect(() => {
        if (currentUser) {
            const timeout = setTimeout(() => {
                setHtml(currentUser.srcDoc.html);
                setCss(currentUser.srcDoc.css);
                setJs(currentUser.srcDoc.js);
            }, 1000);
            return () => clearTimeout(timeout);
        } else {
            setHtml('');
            setCss('');
            setJs('');
        };
    }, [currentUser, setHtml, setCss, setJs]);

    useEffect(() => {
        let reduxTimeout;
        
        if (currentUser) {
            reduxTimeout = setTimeout(() => {
                updateHtml(html);
                updateCss(css);
                updateJs(js);
            }, 2500);
        };
    
        return () => clearTimeout(reduxTimeout);
    }, [srcDoc, updateHtml, updateCss, updateJs]);
    
    
    useEffect(() => {
        const timeout = setTimeout(() => {
            setSrcDoc(`
                <html>
                    <body>${html}</body>
                    <style>${css}</style>
                    <script>${js}</script>
                </html>
            `);
            
        }, 400);

        return () => clearTimeout(timeout);
    });

    return (
        <div className='srcDoc'>
            <TopPaneContainer>
                <Editor displayName='HTML' mode='xml' value={html} onChange={setHtml} collapsedDivs={collapsedDivs} setCollapsedDivs={setCollapsedDivs} />
                <Editor displayName='CSS' mode='css' value={css} onChange={setCss} collapsedDivs={collapsedDivs} setCollapsedDivs={setCollapsedDivs}/>
                <Editor displayName='JS' mode='js' value={js} onChange={setJs} collapsedDivs={collapsedDivs} setCollapsedDivs={setCollapsedDivs}/>
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

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser
})

const mapDispatchToProps = dispatch => ({
    updateHtml: html => dispatch(updateHtml(html)),
    updateCss: css => dispatch(updateCss(css)),
    updateJs: js => dispatch(updateJs(js))
})

export default connect(mapStateToProps, mapDispatchToProps)(SourceDoc);
