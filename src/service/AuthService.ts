import {Injectable} from "@angular/core";
import { Storage } from '@ionic/storage';


@Injectable()
export class AuthService {
  constructor(public storage: Storage) {
  }

  private get_val(val : string) : any
  {
    return this.storage.get(val);
  }

  getToken() : Promise<string> {
    return this.get_val("code");
  }


  getUserName() : Promise<string> {
    return this.get_val("username");
  }

  logout(){
    this.storage.remove("code");
    this.storage.remove("username");
  }
}
