class Animal {
    numLegs: number = 4;
}

class BeeKeeper {
    hasMask: boolean = true;
}

class ZooKeeper {
    nametag: string = "Mikle";
}

class Bee extends Animal {
    numLegs = 6;
    keeper: BeeKeeper = new BeeKeeper();
}

class Lion extends Animal {
    keeper: ZooKeeper = new ZooKeeper();
}

class Humanv1 {
}

class Animalv1 {
    numLegs: number;
    
    constructor(numLegs: number) {
        this.numLegs = numLegs;
    }
}

class BeeKeeperv1 {
    hasMask: boolean;

    constructor(hasMask: boolean) {
        this.hasMask = hasMask;
    }
}

class Beev1 extends Animalv1 {
    keeper: BeeKeeperv1;

    constructor(numLegs: number, keeper: BeeKeeperv1) {
        super(numLegs);
        this.keeper = keeper;
    }
}

export {Animal, Humanv1, Bee, Lion, Animalv1, BeeKeeperv1, Beev1};

