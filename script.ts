class User {
    private userId: number;
    private nickName: string;
    private balance: number;

    constructor(nickName:string , counter:number){
        this.nickName = nickName;
        this.userId = counter;
        this.balance = 0;
    }
    public getNickName():string{
        return this.nickName;
    }
    public getBalance():string{
        return this.balance.toFixed(2).toString();
    }
    public getId():number{
        return this.userId;
    }
    public setBalance(change:number)
    {
        this.balance += change;
    }
}

const usersList: Array <User> = [];  

const addUser = (<HTMLInputElement>document.querySelector(".add-user-button"));

const addPayment = (<HTMLInputElement>document.querySelector(".add-payment-button"));

const confirmPayment = (<HTMLInputElement>document.querySelector('.accept-button'));

(<HTMLInputElement>document.querySelector('.close-btn')).addEventListener('click', ()=>{
    (<HTMLInputElement>document.querySelector(".popup")).style.display = "none";
    (<HTMLInputElement>document.querySelector(".popup-input-box")).value = "";
})

addUser.addEventListener('click',addNewUser);

addPayment.addEventListener('click',addNewPayment);

confirmPayment.addEventListener('click',CalculatePayment);


let counter: number = 0;

//Dodanie nowego użytkownika
function addNewUser(){
    const userName:string = (<HTMLInputElement>document.querySelector(".input-box")).value;
    if(userName == ""){
        alert("Write something!")
    }
    else{
        counter += 1;
        const user:User = new User(userName, counter);
        usersList.push(user);
        AddUserToHtml(user);
        AddToSelect(user);
        (<HTMLInputElement>document.querySelector(".input-box")).value = "";
    }
    console.log(usersList);
}

//Dodanie nowej płatnośći
function addNewPayment()
{
    (<HTMLInputElement>document.querySelector(".popup")).style.display = "block";
    if(usersList.length>0){
        (<HTMLInputElement>document.querySelector(".accept-button")).style.display = "block";
    }
}

//Dodanie użytkownika do HTML
function AddUserToHtml(user:User)
{   
    const userDiv = (<HTMLInputElement>document.querySelector('.users'));
    const newDiv = (<HTMLInputElement>document.createElement('div'));
    newDiv.className = "user";
    userDiv.appendChild(newDiv);
    const newPName = document.createElement('p')
    newPName.textContent = user.getNickName();
    newPName.className = "part";
    newDiv.appendChild(newPName);
    const newPBalance = document.createElement('p')
    newPBalance.textContent = user.getBalance() + " zł";
    newPBalance.className = "part";
    newPBalance.id = user.getId().toString();
    newDiv.appendChild(newPBalance);
}

//Dodanie użytkownika do listy wyboru potwierdzenia płatnośći
function AddToSelect(user:User){
    const select = (<HTMLInputElement>document.querySelector(".popup-select-box"));
    let option = document.createElement('option');
    option.value = `${user.getNickName()}`;
    option.textContent = `${user.getNickName()}`;
    select.appendChild(option);
}

function CalculatePayment(){
    const whoPaid:string = WhoPayed();
    const filtredListPay:Array <User> = usersList.filter(user => user.getNickName() == whoPaid);
    const filtredListNoPay:Array<User> = usersList.filter(user => user.getNickName() != whoPaid)
    const value:number = +(<HTMLInputElement>document.querySelector('.popup-input-box')).value;
    const valueToAdd = value/filtredListNoPay.length;
    filtredListNoPay.forEach(user => user.setBalance(-valueToAdd))
    filtredListPay.forEach(user => user.setBalance(value));
    usersList.forEach(user => DataUpdate(user));

}

function WhoPayed():string{
    const selected = (<HTMLInputElement>document.querySelector(".popup-select-box"));
    return selected.value;
}

function DataUpdate(user:User)
{
    const userBalance = (<HTMLInputElement>document.getElementById(`${user.getId()}`));
    userBalance.textContent = user.getBalance() + " zł";
}