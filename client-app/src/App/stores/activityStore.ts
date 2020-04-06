
import {observable, action, computed, configure, runInAction} from 'mobx'
import { createContext, SyntheticEvent } from 'react'
import IActivitiesObject from '../Models/IActivitiesObject';
import agent from '../api/agent';


configure({enforceActions: 'always'});

class ActivityStore {
    
    @observable activityRegistry = new Map();
    @observable activities : IActivitiesObject[] = [];
    @observable activity : IActivitiesObject | undefined;
    
    @observable loadingInitial : boolean = false;
    @observable editMode : boolean = false;
    @observable submitting : boolean = false;

    @observable target : string = '';

    @computed get activitiesByDate() {
        return Array.from(this.activityRegistry.values())
            .sort((a, b,) => Date.parse(a.date) - Date.parse(b.date));
    }

    @action loadActivities = async () => {
        this.loadingInitial = true;
        //Set this to empty array for now in order to not have the issue of adding more activities on top of those that already exist 
        //in our store.
        try {
            const activities = await agent.Activities.list();
            runInAction('loading activites', () => {
                activities.forEach(x => 
                {
                    x.date = x.date.split('.')[0];
                    this.activityRegistry.set(x.id, x);
                });
            })
            
            
        } catch (error) {
            console.log(error);
        }

        runInAction(() => {
            this.loadingInitial = false;
        });
        
    }

    @action loadActivity = async (id: string) => {
        let activity = this.getActivity(id);
        if(activity) {
            this.activity = activity;
        } else {
            this.loadingInitial = true;
            try {
                activity = await agent.Activities.details(id);
                runInAction('getting activity', () => {
                    this.activity = activity;
                    this.loadingInitial = false;
                })
            } catch (error) {
                console.log(error)
                runInAction('get activity error', () => {
                    this.loadingInitial = false;
                })
            }
        }
    }

    //helper method
    getActivity = (id: string) => {
        return this.activityRegistry.get(id);
    }

    @action createActivity = async (activity : IActivitiesObject) => {
        this.submitting = true;
        this.editMode = true;
        try {
            await agent.Activities.create(activity);
            runInAction('create', () => {
                this.activityRegistry.set(activity.id, activity);
            });
        } catch (error) {
            console.log(error);
        }
        
        runInAction(() => {
            this.editMode = false;
            this.submitting = false;
        })

    }

    @action editActivity = async (activity : IActivitiesObject) => {
        this.submitting = true;
        this.editMode = true;
        try {
            await agent.Activities.update(activity);
            runInAction('editing', () => {
                this.activityRegistry.set(activity.id, activity);
                this.selectActivity(activity.id);
            })

        } catch (error) {
            console.log(error);
        }
        
        runInAction(() => {
            this.editMode = false;
            this.submitting = false;
        });
        
    }

    @action deleteActivity = async (event : SyntheticEvent<HTMLButtonElement>, id: string) => {
        this.target = event.currentTarget.name;
        this.submitting = true;

        try {
            agent.Activities.delete(id);
            runInAction('delete', () => {
                this.activityRegistry.delete(id);
            })
        } catch (error) {
            console.log(error);
        }

        runInAction(() => {
            this.target = "";
            this.submitting = false;
        })      
    }

    @action openCreateForm = () => {
        this.editMode = true;
        this.activity = undefined;
    }

    @action selectActivity = (id: string, editMode? : boolean) => {
        this.activity = this.activityRegistry.get(id);
        this.editMode = editMode === undefined ? false : editMode;
    }
}

export default createContext(new ActivityStore())