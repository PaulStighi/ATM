import { AccDBFactory } from "./AccDBFactory";
import { AccDBFile } from "./AccDBFile";

export class AccDBFileFactory extends AccDBFactory{
    public getAccDB(db_config : string) : AccDBFile {
        return new AccDBFile(db_config);
    }
}