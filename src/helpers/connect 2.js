import axios from 'axios'

class Connect{
    constructor(){
        this.connector = axios
        this.token=null
        if (process.env.NODE_ENV==='development') {
            this.connector.defaults.baseURL='https://lambda-mud-test.com/'
        }
        if (window.localStorage.getItem('token')) {
            this.login(window.localStorage.getItem('token'))
        }
    }

    login=token=>{
        this.connector.defaults.headers.common['Authorization']=`Token ${token}`
        this.token=token
    }

    logout=()=>{
        window.localStorage.removeItem('token')
        return true
    }

    credsLogin=async (user,pass)=>{
        try {
            let attempt = await this.connector('/api/login',{username:user,password:pass})
            console.log('attempt ',attempt)
            let data = await attempt.data
            console.log('data ', data)
        } catch (error) {
            console.error(error)
        }
    }

    testLogin=()=>{
        return (this.token!=null)
    }
}

export default new Connect()