import styled from 'styled-components';

export const TopPaneContainer = styled.div`
    width: 100%;
    height: 40vh;
    display: flex;
    position: relative;
    background-color: #1d1e22;
    overflow: hidden;
    justify-content: space-between;

    @media screen and (max-width: 500px) {
        height: 60vh;
    }
`;

export default { TopPaneContainer };