import { observable, action, computed, runInAction } from 'mobx';
import { SyntheticEvent } from 'react';
import agent from '../api/agent';
import IActivitiesObject from '../Models/IActivitiesObject';
import { history } from '../..';
import { toast } from 'react-toastify';
import { RootStore } from './rootStore';



export default class ActivityStore {

  rootStore: RootStore;

  constructor(root: RootStore) {
    this.rootStore = root;
  }

  @observable activityRegistry = new Map();
  @observable activity: IActivitiesObject | null = null;
  @observable loadingInitial = false;
  @observable submitting = false;
  @observable target = '';

  @computed get activitiesByDate() {
    return this.groupActivitiesByDate(Array.from(this.activityRegistry.values()));
  }

  groupActivitiesByDate(activities : IActivitiesObject[]) {
    const sorted = activities.sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    )

    return Object.entries(sorted.reduce((activities, activity) => {
      const date = new Date(activity.date).toISOString().split('T')[0]; //this is because we are getting an ISO string
      activities[date] = activities[date] ? [...activities[date], activity] : [activity];
      return activities;
    }, {} as {[key : string] : IActivitiesObject[]}));
  }

  @action loadActivities = async () => {
    this.loadingInitial = true;
    try {
      const activities = await agent.Activities.list();
      runInAction('loading activities', () => {
        activities.forEach(activity => {
          activity.date = new Date(activity.date);
          this.activityRegistry.set(activity.id, activity);
        });
        this.loadingInitial = false;
      })
    } catch (error) {
      runInAction('load activities error', () => {
        this.loadingInitial = false;
      })
    }
  };

  @action loadActivity = async (id: string) => {
    let activity = this.getActivity(id);
    if (activity) {
      this.activity = activity;
      return activity;
    } else {
      this.loadingInitial = true;
      try {
        activity = await agent.Activities.details(id);
        runInAction('getting activity',() => {
          activity.date = new Date(activity.date);
          this.activityRegistry.set(activity.id, activity);
          this.loadingInitial = false;
        })
        return activity;
      } catch (error) {
        runInAction('get activity error', () => {
          this.loadingInitial = false;
        })
        
        console.log(error);
      }
    }
  }

  @action clearActivity = () => {
    this.activity = null;
  }

  getActivity = (id: string) => {
    return this.activityRegistry.get(id);
  }

  @action createActivity = async (activity: IActivitiesObject) => {
    this.submitting = true;
    try {
      await agent.Activities.create(activity);
      runInAction('create activity', () => {
        this.activityRegistry.set(activity.id, activity);
        this.submitting = false;
      })
      history.push(`/activities/${activity.id}`);
      toast.success('Activity created successfully');
    } catch (error) {
      runInAction('create activity error', () => {
        this.submitting = false;
      })

      toast.error('Problem submitting data');
      console.log(error);
    }
  };

  @action editActivity = async (activity: IActivitiesObject) => {
    this.submitting = true;
    try {
      await agent.Activities.update(activity);
      runInAction('editing activity', () => {
        this.activityRegistry.set(activity.id, activity);
        this.activity = activity;
        this.submitting = false;
      })
      history.push(`/activities/${activity.id}`);
      toast.success("Edit successful");
    } catch (error) {
      runInAction('edit activity error', () => {
        this.submitting = false;
      })

      toast.error('Problem submitting data');
      console.log(error);
    }
  };

  @action deleteActivity = async (event: SyntheticEvent<HTMLButtonElement>, id: string) => {
    this.submitting = true;
    this.target = event.currentTarget.name;
    try {
      await agent.Activities.delete(id);
      runInAction('deleting activity', () => {
        this.activityRegistry.delete(id);
        this.submitting = false;
        this.target = '';
      })
    } catch (error) {
      runInAction('delete activity error', () => {
        this.submitting = false;
        this.target = '';
      })
      console.log(error);
    }
  }
}
