import { User } from '../../user/user.model';


export class Form {
  _id: string;
  owner: User[] = [];
  imagePath: string;
  type: string;
  title: string;
}
