import styled from 'styled-components';

export const EditorContainer = styled.div`
    flex-grow: 1;
    max-width: ${props => {
        switch (props.collapsedDivs) {
            case 1:
                return `${window.screen.width / 2}px`;
            case 2:
                return `${window.screen.width / 1}px`;
            case 3:
                return `${window.screen.width / .5}px`;
            default:
                return `${window.screen.width / 3}px`;
        }
    }};
    font-size: 1.6rem;
    padding: 1rem;
    flex-basis: 0;
    flex-direction: column;
    ${props => props.collapse ? `
        display: block;
        max-width: 12rem;
    ` : ``};
    display: flex;
    overflow: hidden;
`;

export const EditorTopBar = styled.div`
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    width: 100%;
    height: 3rem;
    background-color: #444857;
    color: #aaaebc;
    display: flex;
    border-bottom: .5px solid #3B3C42;
    box-shadow: .5px .5px 3px #3B3C42;

    & > button {
        height: 2rem;
        align-self: center;
        margin-left: auto;
        margin-right: 1rem;
    }
    
    & > button > img {
        width: 1rem;
        height: auto;
        vertical-align: middle;
    }
`; 

export const EditorTitle = styled.div`
    padding: .5rem .5rem .5rem 1.5rem
`;