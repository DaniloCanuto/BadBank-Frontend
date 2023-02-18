import styled from "styled-components";

const StyledHeader = styled.div`
  background-color: var(--dark);
  height: 8vh;

  .nav {
    justify-content: space-between;
    align-items: center;
    gap: 20px;
    padding: 0 20px;
    height: 100%;

    &:first-child {
      a {
        color: var(--light);
        display: flex;
        align-items: center;
      }
    }

    .links {
      display: flex;
      height: 100%;
      .link {
        padding: 10px;
        height: 100%;
        display: flex;
        justify-content: center;
        flex-direction: column;
        a {
          color: var(--light);
          cursor: pointer;
        }

        .hovered {
          color: var(--primary-color-font);
          font-size: 12px;
        }
        .hovered.protected {
          color: var(--protected);
        }
      }

      .selected {
        background-color: var(--primary);
        height: 100%;
      }
    }
  }
`;

export default StyledHeader;
