class UserDTO {
    constructor({ id, username, email, cars }) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.cars = cars;
    }
}

module.exports = { UserDTO };
