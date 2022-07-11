import { AccDBFileFactory } from "./AccDBFileFactory";
import { AccDBDumbFactory } from "./AccDBDumbFactory";
import { AccDBFactory } from "./AccDBFactory";
import { AccDBProxy } from "./AccDBProxy";

export class Client {
    public static getAccDBProxy(db_config : string) : AccDBProxy {                  // requesting an database proxy, based on a db_config given
        return new AccDBProxy(this.choose_source(db_config).getAccDB(db_config));   // creating the proxy with the database inside based on the db_config
    }

    private static choose_source(db_config : string) : AccDBFactory {               // selecting a factory for creating the databse based on the db_config
        const fs = require('fs');                                       // for parsing the config file the file system module is required
        let obj = JSON.parse(fs.readFileSync(db_config, 'utf8'));       // the file is parsed and the data kept in a new object
        let factory;

        if(obj.input_source === "FILE")                                 // if the input source specified in the config file is "FILE"
            factory = new AccDBFileFactory();                           // a database file facotry is returned
        if(obj.input_source === "DUMB")                                 // if the input source specified in the config file is "DUMB"
            factory = new AccDBDumbFactory();                           // a database dumb facotry is returned

        return factory;
    }
}