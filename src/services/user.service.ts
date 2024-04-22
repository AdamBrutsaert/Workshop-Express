import db from "../configs/db.config";

export type User = {
    id: number;
    name: string;
    description: string;
    age: number;
};

export type UserArgs = Omit<User, 'id'>;

export async function getUser(id: number): Promise<User> {
    return new Promise((resolve, reject) => {
        db.get<User>(`SELECT * FROM users WHERE id = ?`, [id], (err, user) => {
            if (err) return reject(err.message);
            return resolve(user);
        })
    })
}

export async function createUser(args: UserArgs): Promise<User> {
    return new Promise((resolve, reject) => {
        const sql = `INSERT INTO users (name, description, age) VALUES (?, ?, ?)`;
        const params = [args.name, args.description, args.age];
        db.run(sql, params, async function (err) {
            if (err) return reject(err.message);
            getUser(this.lastID)
                .then((user) => resolve(user))
                .catch((err) => reject(err));
        });
    });
}

export async function updateUser(id: number, args: Partial<UserArgs>): Promise<User> {
    return new Promise((resolve, reject) => {
        const sql = `UPDATE users SET name = COALESCE(?, name), description = COALESCE(?, description), age = COALESCE(?, age) WHERE id=?`;
        const params = [args.name ?? null, args.description ?? null, args.age ?? null, id];
        db.run(sql, params, async function (err) {
            if (err) return reject(err.message);
            getUser(this.lastID)
                .then((user) => resolve(user))
                .catch((err) => reject(err));
        });
    });
}

export function deleteUser(id: number): Promise<boolean> {
    return new Promise((resolve, reject) => {
        const sql = `DELETE FROM users WHERE id=?`;
        const params = [id];
        db.run(sql, params, async function (err) {
            if (err) return reject(err.message);
            return resolve(true);
        });
    });
}
