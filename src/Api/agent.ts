import axios, { AxiosError, AxiosResponse } from 'axios';
import { toast } from 'react-toastify';
import { PaginatedResponse } from '../models/pagination/Pagination';
import { store } from '../store/store';
import { Serviceresponse } from '../models/serviceResponse/Serviceresponse';


axios.defaults.baseURL='http://localhost:21466/api/';
axios.defaults.withCredentials=true;

const responseBody=(response:AxiosResponse)=>response.data.data;
const sleep =()=>new Promise(resolve=>setTimeout(resolve,1000));

const responseObject:Serviceresponse={
   success:true,
   responseCode:0,
   message:''
}

axios.interceptors.request.use((config):any=>{
    const token = store.getState().account.user?.token;
    if(token){
        config.headers!.Authorization=`Bearer ${token}`
    }
    return config;
});
axios.interceptors.response.use(async response=>{
    await sleep();
    const pagination= response.headers['pagination'];
    if(pagination){
        response.data.data = new PaginatedResponse(response.data.data,JSON.parse(pagination));
        return response;
    }
    if(response){
       responseObject.message = response.data.message;
       responseObject.success = response.data.success;
       responseObject.responseCode = response.data.responseCode;
    }
    return response;
},(error:AxiosError)=>{
    const  {data,status}:any = error.response;
    switch (status) {
        case 400:
            if(data.errors){
                const modelStateErrors:string[]=[];
                for (const key in data.errors) {
                   if(data.errors[key]){
                    modelStateErrors.push(data.errors[key])
                   }
                    
                }
                throw modelStateErrors.flat();
            }
            toast.error(data.title)
            break;
            case 401:
                toast.error(data.title||'unauthorised')
                break;
                case 500:
                    toast.error(data.title)
                    break;
        default:
            break;
    }
    return Promise.reject(error.response)
});

const requests={
    get:(url:string,params?:URLSearchParams)=>axios.get(url,{params}).then(responseBody),
    post:(url:string,body:{})=>axios.post(url,body).then(responseBody),
    put:(url:string,body:{})=>axios.put(url,body).then(responseBody),
    delete:(url:string)=>axios.delete(url).then(responseBody)
}

const Catalog={
    list:(params:URLSearchParams)=>requests.get('products/getproducts',params),
    details:(id:number)=>requests.get(`products/getproductbyid/${id}`),
    fetchFilters:()=>requests.get(`Products/getproductfilters`)
}

const Cart={
    get:()=>requests.get('cart/getcart'),
    addItem:(productId:number,quantity:number=1)=>requests.post(`cart/addtocart?productId=${productId}&quantity=${quantity}`,{}),
    removeItem:(productId:number,quantity:number=1)=>requests.delete(`cart/deletecart?productId=${productId}&quantity=${quantity}`)
}

const Account={
    login:(values:any)=>requests.post('account/login',values),
    register:(values:any)=>requests.post('account/register',values),
    currentUser:()=>requests.get('account/currentuser'),

}

const serverDebugger={
    get400Error:()=>requests.get('ErrorBroadcast/badrequest'),
    get401Error:()=>requests.get('ErrorBroadcast/unauthorized'),
    get404Error:()=>requests.get('ErrorBroadcast/notfound'),
    getApiError:()=>requests.get('ErrorBroadcast/servererror'),
    getValidationError:()=>requests.get('ErrorBroadcast/validationerror'),
}

const agent = {Catalog,Cart,Account,responseObject,serverDebugger}

export default agent;