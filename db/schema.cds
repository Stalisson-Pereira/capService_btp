namespace cap.management;

using { managed } from '@sap/cds/common';

entity Products  : managed {
    key ID       : UUID;
    name         : String(100);
    descr        : String;
    price        : Decimal(10, 2);
    customers    : Association to Customers;
    stock        : Integer;
}

entity Customers : managed {
    key ID       : UUID;
    description  : String;
    contact      : String;
    email        : String;
    products     : Association to many Products on products.customers = $self;
}