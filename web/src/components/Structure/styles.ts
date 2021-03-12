import styled from 'styled-components'
import Toolbar from '@material-ui/core/Toolbar'

export const Content = styled.div`
  max-height: calc(100vh - 64px);
  padding: 8px;
  display: flex;
  flex: 1;
  transition: 0.5s;
  overflow: auto;
`

export const Container = styled.div`
  width: 100vw;
  height: 100vh;
  max-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
`

export const Wrapper = styled.div`
  width: 100%;
  flex: 1;
  max-height: calc(100vh - 40px);
  display: flex;
  flex-direction: row;
`

export const Check = styled.input`
  display: none;

  &:checked ~ .sidebar {
    width: 60px;

    .link {
      justify-content: center;
      font-size: 20px;
      text-align: center;
      padding: 0;

      i {
        padding: 0;
      }

      span {
        display: none;
      }
    }
  }
`

export const Header = styled(Toolbar)`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: var(--bg-header);
`

export const Mark = styled.div`
  display: flex;
  flex: 1;
  justify-content: start;
  color: var(--header-text);

  label {
    display: flex;
    justify-content: center;
    align-items: center;

    @media screen and (max-width: 600px) {
      display: none;
    }

    i {
      padding: 0px 10px;
    }
  }
`

export const Left = styled.div`
  h3 {
    margin: 0;
    text-transform: uppercase;
    font-size: 22px;
    font-weight: 900;
    color: var(--header-text);
  }
`

export const Sidebar = styled.div`
  width: 230px;
  height: 100%;
  display: flex;
  flex-direction: column;
  background: var(--bg-sidebar);
  padding-bottom: 16px;
  transition: 0.5s;
  -webkit-box-shadow: 2px 0px 6px 1px rgba(0, 0, 0, 0.17);
  box-shadow: 2px 0px 6px 1px rgba(0, 0, 0, 0.17);
  transition-property: width;
  overflow-y: auto;
  overflow-x: hidden;

  .link {
    color: var(--text-color);
    width: 100%;
    height: 50px;
    min-height: 50px;
    display: flex;
    align-items: center;
    flex-direction: row;
    text-decoration: none;
    padding-left: 30px;
    box-sizing: border-box;
    transition: 0.5s;
    transition-property: all;

    i {
      padding-right: 10px;
    }

    &.active {
      background-color: var(--sidebar-active);
    }

    &:hover {
      background-color: var(--sidebar-hover);
    }
  }
`
