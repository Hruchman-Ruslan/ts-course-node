import Person from "./Person";

type Controller = typeof Person;

const controllers = <Controller[]>[Person];

export { controllers };
