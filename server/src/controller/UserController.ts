import {User} from "../entity/User";
import { makeController } from "./makeController";

export const UserController = makeController(User)