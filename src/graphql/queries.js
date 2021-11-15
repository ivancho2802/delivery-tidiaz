/* eslint-disable */
// this is an auto generated file. This will be overwritten
import {gql} from '@apollo/client'
/* GraphQL */
export const LOAD_USER = gql`
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      username
      email
      orders {
        items {
          id
          createdAt
          type
          status
          originLatitude
          oreiginLongitude
          destLatitude
          destLongitude
          userId
          carId
          updatedAt
        }
        nextToken
      }
      car {
        id
        type
        latitude
        longitude
        heading
        isActive
        orders {
          nextToken
        }
        userId
        user {
          id
          username
          email
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const listUsers =gql`
  query ListUsers(
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        username
        email
        orders {
          nextToken
        }
        car {
          id
          type
          latitude
          longitude
          heading
          isActive
          userId
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getCar = gql`
  query GetCar($id: ID!) {
    GetCar(id: $id) {
      id
      type
      latitude
      longitude
      heading
      isActive
      orders {
        items {
          id
          createdAt
          type
          status
          originLatitude
          oreiginLongitude
          destLatitude
          destLongitude
          userId
          carId
          updatedAt
        }
        nextToken
      }
      userId
      user {
        id
        username
        email
        orders {
          nextToken
        }
        car {
          id
          type
          latitude
          longitude
          heading
          isActive
          userId
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const listCars = gql `

  query ListCars(
    $filter: ModelCarFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCars(filter: $filter, limit: $limit, nextToken: $nextToken) {
      
        id
        type
        latitude
        longitude
        heading
        isActive
        orders {
          nextToken
        }
        userId
        user {
          id
          username
          email
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
    }
  }
`;
export const listTypeCars = gql `

  query ListTypeCars(
    $filter: ModelCarFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTypeCars(filter: $filter, limit: $limit, nextToken: $nextToken) {
      id
      type
      price
      duration
    }
  }
`;
export const getOrder = gql`
  query GetOrder($id: ID!) {
    getOrder(id: $id) {
      items{
        id 
        createdAt 
        type 
        status 
        originLatitude 
        oreiginLongitude 
        destLatitude    
        destLongitude  
        userId  
        carId     
        updatedAt
      }      
      status
      id  
      nextToken 
      updatedAt  
      car{ 
        id
        type
        latitude
        longitude
        heading
        isActive
        userId
        createdAt
        updatedAt
      }
    }
  }
`;
export const listOrders =gql`
  query ListOrders(
    $filter: ModelOrderFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listOrders(filter: $filter, limit: $limit, nextToken: $nextToken) {
      id
      items {
        id
        createdAt
        type
        status
        originLatitude
        oreiginLongitude
        destLatitude
        destLongitude
        userId
        user {
          id
          username
          email
          createdAt
          updatedAt
        }
        carId
        car {
          id
          type
          latitude
          longitude
          heading
          isActive
          userId
          createdAt
          updatedAt
        }
        updatedAt
      }
      
      car {
        id
        type
        latitude
        longitude
        heading
        isActive
        userId
        createdAt
        updatedAt
      }
      updatedAt
      nextToken
    }
  }
`;