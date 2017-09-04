import { Form } from '../picture/form/form.model';
import { User } from '../user/user.model';
// import { Quote } from '../quote/quote.model';
import { Product } from '../product/product.model';

import { Project, DateDjoa } from '../project/project.model';


export class Mission {
    _id: string = '';
    projects: Project[] = []
    title: string = '';
    // editMode: boolean = false;
    description: string = '';
    // missionType: string = '';
    dateMission: DateDjoa = new DateDjoa()
    users: User[] = [];
    products: Product[] = [];
    // products: Product[] = [];
    // start: Date = new Date()
    // startString: string = '';
    // end: Date = new Date()
    // endString: string = '';

    // dateMission: DateMission = new DateMission()
}
// export class DateMission {
//   start: Date = new Date()
//   startString: string = '';
//   end: Date = new Date()
//   endString: string = '';
// }

// export const typeMissions = [
//   'strat',
//   'content',
//   'research',
//   'other',
// ]
