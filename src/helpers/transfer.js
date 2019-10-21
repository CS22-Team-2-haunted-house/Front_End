export default class Transfer{
    constructor(status,message){
        this.status=status
        this.message=message
    }

    edit(status,message){
        this.status=status
        this.message=message
    }

    print(){
        return this.message
    }

    success(){
        return this.status
    }
}