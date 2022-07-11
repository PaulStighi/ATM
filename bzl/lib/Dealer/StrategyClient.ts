import { Strategy } from "./Strategy/Strategy";
import { ArrayIterator } from "../BillBox/ArrayIterator";
import { BillBox } from "../BillBox/BillBox";
var _ = require('lodash');

export abstract class StrategyClient {
    protected strategies : Map<string, Strategy> = require("../../../config/Strategy/strategy_config").strategies;

    public abstract chooseStrategy(bill_boxes : ArrayIterator<BillBox>) : Strategy
}