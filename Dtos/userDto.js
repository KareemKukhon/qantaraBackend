class UserDTO {
    constructor({ id, username, phoneNumber, cars }) {
        this.id = id;
        this.username = username;
        this.phoneNumber = phoneNumber;
        this.cars = cars;
    }
}

module.exports = { UserDTO };
