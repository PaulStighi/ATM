import { Profile } from "./Profile";

export class Account {
    private profile : Profile;
    private crt_sold : number;

    constructor(profile : Profile, crt_sold : number) {
        this.profile = profile;
        this.crt_sold = crt_sold;
    }

    public getProfile() : Profile {
        return this.profile;
    }

    public getCrtSold() : number {
        return this.crt_sold;
    }

    public setCrtSold(new_sold : number) : void {
        this.crt_sold = new_sold;
    }
}