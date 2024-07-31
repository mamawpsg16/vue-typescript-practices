<template>
    <div>
        {{ isAdmin }}
    </div>
    <pre>
        <p v-for="([key, data]) in details.entries()" :key="key">{{ key }} {{ data }}</p>
    </pre>
    <pre>
        {{ bag.get() }}
    </pre>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, readonly  } from 'vue'
import type { MyBool, Options, eitherType, PersonDetails, ArtistsData, AnyData, ObjectMustHavePropertyOfName, Backpack, Point, ObjectType, Human, Fish, Bird, User, DB, UserSignature, NumberCollection, DataType, IdOrNameProperty } from './types/Index.ts';
import axios from 'axios';
import {Animal, Humanv1, Bee, Lion, Animalv1, BeeKeeperv1, Beev1} from './classes/Index.ts';
export default defineComponent({
    
    setup () {
        const isAdmin = readonly(ref<MyBool>(false));
        
        const selectedOption = ref<Options>("A");
        const name = ref<eitherType>("Kevin Mensah");

        const address = reactive<PersonDetails>({
            name: "Kevin Mensah",
            age:25,
            street: "C.Mercado",
            city: 'Guiguinto'
        });

        const artists = reactive<ArtistsData>({
            artists: [
                { name: 'Kevin Mensah' }
            ]
        });

        const details = reactive<AnyData>([1,2]);

        const objs = reactive<ObjectMustHavePropertyOfName>([
            {name: 'Kevin Mensah'},
            {name: 'Rojenson'},
        ]);

        const supplies = reactive<Array<string>>([]);
        const bag = reactive<Backpack<string>>({
            add: (supply: string) => {
                // Your implementation here
                supplies.push(supply);
            },
            get: () => {
                // Your implementation here, e.g., return a default value or throw an error
                return supplies[0] || 'No Data At Index 0'; // Adjust as necessary
            },
        });
        const points = reactive({ y: 2, z: 3 });

        const human: Human = {
            swim: () => {
                console.log("Swimming");
            },
            fly: () => {
                console.log("Flying");
            },
        };

        const fish:Fish = { swim: () => "" };
        const bird:Bird = { fly: () => "" };

        const users = reactive<User[]>([
            { id: 1, admin: true, becomeAdmin() { this.admin = true; } },
            { id: 2, admin: false, becomeAdmin() { this.admin = true; } },
        ]);

        const userDetails = reactive<UserSignature>(
            {
                1:{
                    id: 1,
                    admin: false,
                    becomeAdmin() { 
                        this.admin = true; 
                    }
                },
                2:{
                    id: 1,
                    admin: false,
                    becomeAdmin() { 
                        this.admin = true; 
                    }
                },
                3:{
                    id: 1,
                    admin: false,
                    becomeAdmin() { 
                        this.admin = true; 
                    }
                }
            },
        );
        
        const fruits =  ref<NumberCollection>(['Strawberry', 'Pineapple', 'Apple']);

        let properties = reactive({ a: 1, b: 2, c: 3, d: 4 });

        const data = ref<DataType>({ value: '1' });
        const data1 = ref<DataType<boolean>>({ value: true });

        return {
            isAdmin,
            details,
            bag,
            points,
            human,
            fish,
            bird,
            users,
            userDetails,
            fruits,
            properties
        }
    },

    methods:{
        logPoint(p: Point) {
            console.log(`${p.x}, ${p.y}, ${p.z}`);
        },

        logSelectedOption(selectedOption: Options):Options {
            return selectedOption;
        },

        move(type: ObjectType): void {
            console.log(typeof type);
            if ("swim" in type && type.swim) {
                type.swim();
            } else if ("fly" in type && type.fly) {
                type.fly();
            } else {
                console.log("Animal can't swim or fly");
            }
        },

        isFish(pet: Fish | Bird): pet is Fish {
            return (pet as Fish).swim !== undefined;
        },

        firstElement<Type>(arr: Type[]): Type | undefined {
            return arr[0];
        },

        mapFn<Input, Output>(arr: Input[], func :(arg: Input) => Output): Output[]{
            return arr.map(func);
        },

        constrainedFunction<T extends { length:number }>(arr: T): number{
            return arr.length;
        },

        combine<Type1, Type2>(arr1: Type1[], arr2: Type2[]): (Type1 | Type2)[] {
            return [...arr1, ...arr2];
        },

        userModel(users: User[]): DB {
            return {
                filterUsers(filter: (user: User) => boolean): User[] {
                    return users.filter(filter);
                }
            };
        },

        eachFn<Input>(arr: Input[], func:(arg: Input, index?: number) => void):void{
            arr.forEach(func);
        },

        multiplyFn(n: number, ...m: number[]) {
            return m.map((x) => n * x);
        },

        getProperty<Type, Key extends keyof Type>(obj: Type, key: Key): Type[Key] {
            return obj[key];
        },

        createAnimalInstance<Type extends Animal>(c: new () => Type): Type{
            return new c();
        },

        createAnimalInstancev1<T extends Animal>(c: new (...args: any[]) => T, ...args: any[]): T {
            return new c(...args);
        },

        createLabel<T extends string | number>(arg : T): IdOrNameProperty<T>{
            if(typeof arg === "string"){
                return { name: arg} as IdOrNameProperty<T>;
            }else if(typeof arg === "number"){
                return { id: arg } as IdOrNameProperty<T>;
            }else {
                throw new Error("Argument must be a string or number");
            }
        }
    },

    created(){
        this.bag.add('Pencil');
        this.logPoint(this.points);
        this.logSelectedOption('A');
        this.move(this.human)
        console.log(this.isFish(this.fish));
        console.log(this.isFish(this.bird));
        const firstElement = this.firstElement(["a", "b", "c"]);
        console.log(firstElement,"firstElement");
        const mapFn = this.mapFn([1,2,"A"], (arg) => arg);
        console.log(mapFn,"mapFn");
        console.log(this.constrainedFunction([1,2,"A"]));
        
        const userDB = this.userModel(this.users);
        const adminUsers = userDB.filterUsers((user) => user.admin === true);
        console.log(adminUsers, 'USERMODEL');
        const eachFn = this.eachFn([1,2,"A"], (arg) => console.log(arg,'AYO'));
        const multiplyFn = this.multiplyFn(1,2,3,4,5);
        console.log(multiplyFn, 'multiplyFn');
        this.isAdmin = true;
        console.log(this.userDetails);
        console.log(this.fruits,'fruits');
        console.log(this.getProperty(this.properties,'d'));
        const lionInstance = this.createAnimalInstance(Lion)
        const beeInstance = this.createAnimalInstance(Bee)
        console.log(lionInstance.keeper.nametag,'lionInstance');
        console.log(beeInstance.keeper.hasMask,'beeInstance');
        const beeKeeper = new BeeKeeperv1(true);
        const beeInstancev1 = this.createAnimalInstancev1(Bee, 6, beeKeeper); 
        console.log(beeInstancev1,'beeInstancev1');

        const conditionalType = this.createLabel('kevin');
        console.log(conditionalType, "conditionalType");
        
    },

    async mounted(){
        try {
            const response = await axios.get('https://dogapi.dog/api/v2/breeds');
        } catch (error) {
            console.log(error,"error");            
        }
    }
})
</script>

<style scoped>

</style>