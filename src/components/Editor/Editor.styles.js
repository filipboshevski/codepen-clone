import styled from 'styled-components';

export const EditorContainer = styled.div`
    flex-grow: ${props => props.collapse ? '0' : '1'};
    font-size: 1.6rem;
    padding: 1rem;
    flex-basis: 0;
    flex-direction: column;
    display: flex;
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