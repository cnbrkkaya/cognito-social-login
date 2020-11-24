/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateOrder = /* GraphQL */ `
  subscription OnCreateOrder($owner: String!) {
    onCreateOrder(owner: $owner) {
      id
      menuName
      totalPrice
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onUpdateOrder = /* GraphQL */ `
  subscription OnUpdateOrder($owner: String!) {
    onUpdateOrder(owner: $owner) {
      id
      menuName
      totalPrice
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onDeleteOrder = /* GraphQL */ `
  subscription OnDeleteOrder($owner: String!) {
    onDeleteOrder(owner: $owner) {
      id
      menuName
      totalPrice
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onCreateMenu = /* GraphQL */ `
  subscription OnCreateMenu($owner: String) {
    onCreateMenu(owner: $owner) {
      id
      name
      price
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onUpdateMenu = /* GraphQL */ `
  subscription OnUpdateMenu($owner: String) {
    onUpdateMenu(owner: $owner) {
      id
      name
      price
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onDeleteMenu = /* GraphQL */ `
  subscription OnDeleteMenu($owner: String) {
    onDeleteMenu(owner: $owner) {
      id
      name
      price
      createdAt
      updatedAt
      owner
    }
  }
`;
