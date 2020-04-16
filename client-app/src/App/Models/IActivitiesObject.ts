interface IActivitiesObject {
    id : string 
    title : string 
    description : string 
    category : string 
    date : Date
    city : string 
    venue : string 
}


export interface IActivitiesFormValues extends Partial<IActivitiesObject> {
    time? : Date
}

export class ActivityFormValues implements IActivitiesFormValues {

    id?: string = undefined;
    title: string = '';
    category: string = '';
    description: string = ''
    date?: Date = undefined;
    time?: Date = undefined;
    city: string = '';
    venue: string = '';

    /**
     *
     */
    constructor(init? : IActivitiesFormValues) { 
        if (init && init.date) {
            init.time = init.date;
        }

        Object.assign(this, init);
    }
}

export default IActivitiesObject;