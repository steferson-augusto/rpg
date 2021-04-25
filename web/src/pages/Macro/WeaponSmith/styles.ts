import styled from 'styled-components'

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 8px;

  .form {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;

    .content {
      padding-bottom: 16px;

      .MuiFormControl-root {
        margin: 4px;
      }
    }
  }

  .state {
    width: 100%;
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    padding: 12px 0;

    p {
      min-width: 170px;
      padding: 0 4px;
      text-align: center;
    }
  }

  .items {
    position: relative;

    .copy {
      position: absolute;
      top: -12px;
      right: -48px;
    }

    table {
      display: block;
    }

    tbody {
      max-height: 300px;
      display: block;
      overflow-y: auto;
    }

    td,
    th {
      width: 100px;
      text-align: center;
    }

    th {
      color: var(--primary);
    }
  }
`
