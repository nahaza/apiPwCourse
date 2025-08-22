import { APIRequestContext } from "playwright";
import { Playlists } from "./controllers/Playlists/Playlists.controller";
import { Users } from "./controllers/Users/Users.controller";

export class APIClient {
  playlist: Playlists;
  users: Users;
  constructor(request: APIRequestContext) {
    this.playlist = new Playlists(request);
    this.users = new Users(request);
  }
}
