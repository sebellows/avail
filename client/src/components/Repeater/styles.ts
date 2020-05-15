import styled from 'styled-components';

export const Wrapper = styled.fieldset`
  padding-top: 2rem;

  legend {
    position: relative;
    top: -1rem;
  }
`;

const StyledItemAddon = styled.span`
  background-color: var(--light);
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0.25rem 0.25rem;
  min-width: 2rem;
`;

export const StyledItem = {
  Wrapper: styled.div`
    border: solid var(--border-color);
    border-width: 1px 1px 0 1px;
    display: flex;
    align-items: stretch;
    width: 100%;

    &:last-of-type {
      border-bottom-width: 1px;
    }
  `,
  Group: styled.div`
    background-color: var(--white);
    border: solid var(--border-color);
    border: 0 var(--border-width);
    display: flex;
    flex: 1;
    align-items: center;
    padding: 0.25rem 0.5rem;

    label {
      display: none;
    }

    .field {
      flex: 1;
      width: auto;
      position: relative;

      &.first label {
        display: block;
        margin: 0;
        position: absolute;
        top: -2rem;
      }
    }
  `,
  Separator: styled.span`
    display: inline-flex;
    margin: 0 0.25rem;
  `,
  Prepend: StyledItemAddon,
  Append: styled(StyledItemAddon)`
    justify-content: space-between;
  `,
};
