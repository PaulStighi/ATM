import { AccDBFactory } from "./AccDBFactory";
import { AccDBDumb } from "./AccDBDumb";

export class AccDBDumbFactory extends AccDBFactory{
    public getAccDB() : AccDBDumb {
        return new AccDBDumb();
    }
}