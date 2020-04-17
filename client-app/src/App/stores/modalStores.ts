import { RootStore } from "./rootStore";
import { observable, action } from "mobx";

export default class ModalStore {
    root : RootStore;

    constructor(root : RootStore) {
        this.root = root;
    }

    @observable.shallow modal = {
        open: false,
        body: null
    }

    @action openModal = (content : any) => {
        this.modal.open = true;
        this.modal.body = content;
    }

    @action closeModal = () => {
        this.modal.open = false;
        this.modal.body = null;
    }
}