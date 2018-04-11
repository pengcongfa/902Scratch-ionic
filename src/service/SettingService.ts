import {Injectable} from "@angular/core";
import { Storage } from '@ionic/storage';


@Injectable()
export class SettingService {
  constructor(public storage: Storage) {
  }

  public get_disable_img() : Promise<any>
  {
    return this.storage.get("disable_img");
  }

  public get_disable_animation(): Promise<any>
  {
    return this.storage.get("disable_animation");
  }
}
