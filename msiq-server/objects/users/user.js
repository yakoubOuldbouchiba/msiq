class User{
    constructor(userName , userPassword , nomClient , prenomClient ,dateNaissance , mobile , email , fonction , structure , departement){
        this.userName = userName;
        this.userPassword = userPassword;
        this.nomClient = nomClient;
        this.prenomClient = prenomClient;
        this.dateNaissance = dateNaissance;
        this.mobile = mobile;
        this.email = email;
        this.fonction = fonction;
        this.structure = structure;
        this.departement = departement;
    }
}

module.exports = User;