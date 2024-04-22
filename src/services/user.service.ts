export type User = {
    id: number;
    name: string;
    description: string;
    age: number;
};

export type UserArgs = Omit<User, 'id'>;

const users: User[] = [
    { id: 1, name: "John Doe", description: "Im a good boi", age: 69 },
    { id: 2, name: "Jane Doe", description: "HANN", age: 42 },
    { id: 3, name: "Bob", description: "I'm a teapot", age: 418 },
];

let id = 4;

export function getUser(id: number): User | undefined {
    return users.find((user) => user.id === id);
}

export function createUser(args: UserArgs): User {
    const user: User = { id: id++, ...args};
    users.push(user);
    return user;
}

export function updateUser(id: number, args: Partial<UserArgs>): User | undefined {
    const user = getUser(id);
    if (!user) return undefined;

    if (args.name !== undefined) user.name = args.name;
    if (args.description !== undefined) user.description = args.description;
    if (args.age !== undefined) user.age = args.age;
    return user;
}

export function deleteUser(id: number): boolean {
    const index = users.findIndex((user) => user.id === id);
    if (index === -1) return false;
    users.splice(index, 1);
    return true;
}
