export class Profile {
    private card_number : string;
    private card_pin : number;
    private email : string;
    private phone_number : string;

    constructor(card_number : string, card_pin : number, email? : string, phone_number? : string){
        this.card_number = card_number;
        this.card_pin = card_pin;
        this.email = email != "" ? email : null;
        this.phone_number = phone_number != "" ? phone_number : null;
    }

    public getCardNumber() : string {
        return this.card_number;
    }

    public getCardPin() : number {
        return this.card_pin;
    }

    public getEmail() : string {
        return this.email;
    }

    public getPhoneNumber() : string {
        return this.phone_number;
    }
}