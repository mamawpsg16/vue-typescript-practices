export type MyBool = true | false;
export type Options = "A" | "B" | "C" | "D";
export type eitherType = number | string;

type Person = {
    name: string;
    age: number;
};

type Address = {
    street: string;
    city: string;
};

export type PersonDetails = Person & Address;

export interface ArtistsData {
    artists: { name: string }[];
}

export type AnyData = Array<any>;

export type ObjectMustHavePropertyOfName = Array<{ name: string }>;

export interface Backpack<Type> {
    add: (obj: Type) => void;
    get: () => Type;
}

export interface Point {
    x?: number;
    y: number;
    z: number;
}

export type Fish = { swim: () => void };
export type Bird = { fly: () => void };
export type Human = { swim?: () => void; fly?: () => void };

export type ObjectType = Fish | Bird | Human;

export type User = { id: number, admin: boolean, becomeAdmin: () => void }

export interface DB {
    filterUsers(filter: (user: User) => boolean): User[];
}

export type UserSignature ={
    [key: number]: User
}

export interface NumberCollection {
    [index: number]: string;
}

export interface DataType<T = string> {
    value: T;
}

export type PersonKeys = keyof Person;

type IdProperty = {
    id : number;
};
type NameProperty  = {
    name : string;
};

export type IdOrNameProperty<T extends string | number> =  T extends number ? IdProperty : NameProperty; 

