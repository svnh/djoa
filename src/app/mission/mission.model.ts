import { Form } from '../picture/form/form.model';
import { User } from '../user/user.model';
import { Quote } from '../quote/quote.model';
import { Project } from '../project/project.model';


export class Mission {
    _id: string = '';
    projects: Project[] = []
    title: string = '';
    editMode: boolean = false;
    description: string = '';
    status: string = '';
    users: User[] = [];
    start: Date = new Date()
    startString: string = '';
    end: Date = new Date()
    endString: string = '';

    // dateMission: DateMission = new DateMission()
}
// export class DateMission {
//   start: Date = new Date()
//   startString: string = '';
//   end: Date = new Date()
//   endString: string = '';
// }
