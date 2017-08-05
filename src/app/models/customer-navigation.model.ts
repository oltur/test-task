import { Customer } from "./customer.model";

export class CustomerNavigation {

    constructor(
        public customer: Customer,
        public customerId: number,
        public pages: string,
        public timeStamp: Date
    ) { }
}
