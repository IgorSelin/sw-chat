export enum ECollections {
  Main = 'sw-chat',
  Users = '/users',
  Relations = 'relations'
}

export const chatPath = (path: string) => `/chat/${path}`;
