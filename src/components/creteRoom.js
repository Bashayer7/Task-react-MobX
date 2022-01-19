import roomStore from "../roomStore";
import { observer } from "mobx-react";
import { action } from "mobx";


class createRoom{
    rooms[];
    constructor(){
        makeObservable(this,{

createRoom:action;
}
const cr=new createRoom();
cr.createRoom();
export default cr;