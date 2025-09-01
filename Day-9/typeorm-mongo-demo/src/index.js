import("reflect-metadata");
import User from "./entity/user.js";
import { DataSource } from "typeorm";

const AppDataSource = new DataSource({
    type: "mongodb",
    url: "mongodb+srv://mrsiddharthsolanki:Sid4Art%40059@reactapp1.psgd72b.mongodb.net",
    synchronize: true,
    logging: true,
    entities: [User],
});

async function start() {
    try {
        await AppDataSource.initialize();
        const userRepo = AppDataSource.getMongoRepository(User);

        const user = userRepo.create({
            name: "Siddharth",
            email: "sid@sid.com",
            age: 19
        });

        await userRepo.save(user);
        console.log("User Saved:", user);

        const allUser = await userRepo.find();
        console.log("all User:", allUser);

        const oneUser = await userRepo.findOne({ where: { email: "sid@sid.com" } });
        console.log("One User:", oneUser);

        if (oneUser) {
            oneUser.age = 22;
            await userRepo.save(oneUser);
            console.log("Updated User:", oneUser);

            await userRepo.delete(oneUser);
            console.log("Deleted user");
        }
    } catch (error) {
        console.log(" start error:", error);
    }
}

start();

