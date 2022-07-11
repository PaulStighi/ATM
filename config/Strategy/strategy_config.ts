import { AscendingStrategy } from "../../bzl/lib/Dealer/Strategy/AscendingStrategy";
import { DescendingStrategy } from "../../bzl/lib/Dealer/Strategy/DescendingStrategy";
import { Strategy } from "../../bzl/lib/Dealer/Strategy/Strategy";

export 
let strategies = new Map<string, Strategy>([ 
    ["asc" , new AscendingStrategy()], 
    ["desc", new DescendingStrategy()]
]);