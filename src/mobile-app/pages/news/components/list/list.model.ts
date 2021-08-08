export interface ListCreator {
  subject: string;
  index: number;
  selected: boolean;
  date: string;
  recivers: User[];
  sender: User;
}

export interface User {
  id: number;
  username?: string;
  firstname?: string;
  lastname?: string;
}
