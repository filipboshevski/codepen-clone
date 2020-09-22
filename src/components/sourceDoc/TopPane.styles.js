import styled from 'styled-components';

export const TopPaneContainer = styled.div`
    width: 100%;
    height: 40vh;
    display: flex;
    position: relative;
    background-color: #1d1e22;
    overflow: hidden;
    justify-content: space-between;
`;

export const Resizer = styled.div`
    background: #444857;
    height: ${props => props.alignment ? '100%' : '1.7rem'};
    cursor: row-resize;
    z-index: 10;
    position: ${props => props.alignment ? 'relative' : 'absolute'};
    bottom: 0;
    left: 0;
    width: ${props => props.alignment ? '1rem' : '100%'};
    box-shadow: .5px .5px 1px #3B3C42;
`;

export default { TopPaneContainer };