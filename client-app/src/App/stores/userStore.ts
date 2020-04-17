import { observable, computed, action, configure, runInAction } from "mobx";
import { IUser, IUserFormValues } from "../Models/User";
import agent from "../api/agent";
import { RootStore } from "./rootStore";
import { history } from "../..";

configure({enforceActions: 'always'});

export default class UserStore {

    rootStore: RootStore;

    constructor(root: RootStore) {
      this.rootStore = root;
    }

    @observable user: IUser | null = null;

    @computed get isLoggedIn() {
        return !!this.user;
    }

    @action login = async (values: IUserFormValues) => {
        try {
            const user = await agent.User.login(values);
            runInAction('Setting user', () => { this.user = user; });  
            this.rootStore.commonStore.setToken(user.token);
            this.rootStore.modalStore.closeModal();
            history.push('/activities')
        } catch(error) {
            throw error;
        }
    }

    @action logout = () => {
        this.rootStore.commonStore.setToken(null);
        this.user = null;

        history.push('/');
    }

    @action setUser = async () => {
        try {
            const user = await agent.User.current();
            runInAction(() => {
                this.user = user;
            })
        } catch (error) {
            console.log(error);
        }
    }

    @action register = async (values : IUserFormValues) => {
        try {
            const user = await agent.User.register(values);
            runInAction(() => {
                this.rootStore.commonStore.setToken(user.token);
                this.rootStore.modalStore.closeModal();
                this.user = user;
            })

            history.push('/activities');
        } catch(error) {
            throw error;
        }
    }
}