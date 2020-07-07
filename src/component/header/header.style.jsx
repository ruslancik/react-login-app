import styled from 'styled-components'
import {Link} from 'react-router-dom'

export const HeaderContainer = styled.div`
    height: 70px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items:center;
    margin-bottom: 25px;
`;


export const OptionsContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

export const OptionLink = styled(Link)`
  padding: 10px 15px;
  cursor: pointer;
`;

export const UserGreeting = styled.div`
    font-weight: 700;
`