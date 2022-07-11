import { AccDB } from "./AccDB";

export abstract class AccDBFactory{
    public abstract getAccDB(db_config? : string) : AccDB;
}