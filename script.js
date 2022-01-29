var User = /** @class */ (function () {
    function User(nickName, counter) {
        this.nickName = nickName;
        this.userId = counter;
        this.balance = 0;
    }
    User.prototype.getNickName = function () {
        return this.nickName;
    };
    User.prototype.getBalance = function () {
        return this.balance.toFixed(2).toString();
    };
    User.prototype.getId = function () {
        return this.userId;
    };
    User.prototype.setBalance = function (change) {
        this.balance += change;
    };
    return User;
}());
var usersList = [];
var addUser = document.querySelector(".add-user-button");
var addPayment = document.querySelector(".add-payment-button");
var confirmPayment = document.querySelector('.accept-button');
document.querySelector('.close-btn').addEventListener('click', function () {
    document.querySelector(".popup").style.display = "none";
    document.querySelector(".popup-input-box").value = "";
});
addUser.addEventListener('click', addNewUser);
addPayment.addEventListener('click', addNewPayment);
confirmPayment.addEventListener('click', CalculatePayment);
var counter = 0;
//Dodanie nowego użytkownika
function addNewUser() {
    var userName = document.querySelector(".input-box").value;
    if (userName == "") {
        alert("Write something!");
    }
    else {
        counter += 1;
        var user = new User(userName, counter);
        usersList.push(user);
        AddUserToHtml(user);
        AddToSelect(user);
        document.querySelector(".input-box").value = "";
    }
    console.log(usersList);
}
//Dodanie nowej płatnośći
function addNewPayment() {
    document.querySelector(".popup").style.display = "block";
    if (usersList.length > 0) {
        document.querySelector(".accept-button").style.display = "block";
    }
}
//Dodanie użytkownika do HTML
function AddUserToHtml(user) {
    var userDiv = document.querySelector('.users');
    var newDiv = document.createElement('div');
    newDiv.className = "user";
    userDiv.appendChild(newDiv);
    var newPName = document.createElement('p');
    newPName.textContent = user.getNickName();
    newPName.className = "part";
    newDiv.appendChild(newPName);
    var newPBalance = document.createElement('p');
    newPBalance.textContent = user.getBalance() + " zł";
    newPBalance.className = "part";
    newPBalance.id = user.getId().toString();
    newDiv.appendChild(newPBalance);
}
//Dodanie użytkownika do listy wyboru potwierdzenia płatnośći
function AddToSelect(user) {
    var select = document.querySelector(".popup-select-box");
    var option = document.createElement('option');
    option.value = "".concat(user.getNickName());
    option.textContent = "".concat(user.getNickName());
    select.appendChild(option);
}
function CalculatePayment() {
    var whoPaid = WhoPayed();
    var filtredListPay = usersList.filter(function (user) { return user.getNickName() == whoPaid; });
    var filtredListNoPay = usersList.filter(function (user) { return user.getNickName() != whoPaid; });
    var value = +document.querySelector('.popup-input-box').value;
    var valueToAdd = value / usersList.length;
    filtredListNoPay.forEach(function (user) { return user.setBalance(-valueToAdd); });
    filtredListPay.forEach(function (user) { return user.setBalance(valueToAdd); });
    usersList.forEach(function (user) { return DataUpdate(user); });
}
function WhoPayed() {
    var selected = document.querySelector(".popup-select-box");
    return selected.value;
}
function DataUpdate(user) {
    var userBalance = document.getElementById("".concat(user.getId()));
    userBalance.textContent = user.getBalance() + " zł";
}
