import { Customer } from "./customer.model";

export class CustomerNavigation {
    constructor(
        public customer: Customer,
        public pages: string,
        public timeStamp: Date
    ) { }
}
