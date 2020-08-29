import { UIDefs } from "./UIDefine";
import { UILoginPage } from "../../game/Modules/login/ui/UILoginPage";
import { UIPanel } from "./UIPanel";
import { Singleton } from "../common/Singleton";

const CS = require('csharp');


export class UIFactory{


    public static createUI(pkg:string, name:string){

        let comp = CS.FairyGUI.UIPackage.CreateObject(pkg, name).asCom
        
        let ui:UIPanel = null;

        if(name == UIDefs.UILoginPage){
            ui = new UILoginPage();
           
        }


        if(ui!=null){
            ui.fui = comp;
            ui.name = name;
            ui.awake();
        } 

        return ui;
    }



}