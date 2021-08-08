// export interface crudItems {
//   title: string;
//   suject: string;
//   endTime: any;
// }
export interface CrudCreator {
  sourceNews: ComboItems[];
  importantNews:ComboItems[];
  urgentNews:ComboItems[];
  newsTruth:ComboItems[];
  archiveNews:ComboItems[];
  receivers: User[];
}
export interface CrudModel {
  id?: number;
  title: string;
  subject: string;
  userNews: receiver[];
  sourceNews: ComboItems;
  importantNews:ComboItems;
  urgentNews:ComboItems;
  newsTruth:ComboItems;
  mission :ComboItems;
  archiveNews: ComboItems;
  sender_time:number;
  localAttachment?:string[];
  attachment?: string;
  text:string;
}
export interface receiver {
  receiver:User;
}

export interface User   {
  id: number;
  username?: string;
  firstname?: string;
  lastname?: string;
  position?: string;
}
export interface ComboItems {
  id: number;
  name?: string;
}


