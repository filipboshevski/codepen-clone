import styled from 'styled-components';

export const CustomButton = styled.button`
    display: flex;
    align-items: center;
    border: none;
    padding: 1.4rem 2rem;
    font-weight: ${props => props.bold ? '700' : '400'};
    font-size: 1.55rem;
    color: ${props => props.color};
    background-color: ${props => props.bgColor};
    box-shadow: 0px 1px 8px rgba(0,0,0, .6);
    border-radius: 5px;
    transform: scaleY(1) translateY(0);
    transition: all .3s;

    &:hover {
        background-color: ${props => props.hoverBgColor};
    }

    &:focus,
    &:active {
        outline: none;
    }

    &:active:hover {
        transform: scale(.98) translateY(.15rem);
        background-color: ${props => props.activeBgColor};
    }
`;