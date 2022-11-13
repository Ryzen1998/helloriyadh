import axios, { AxiosError, AxiosResponse } from 'axios';
import { toast } from 'react-toastify';


axios.defaults.baseURL='http://localhost:21466/api/';
axios.defaults.withCredentials=true;

const responseBody=(response:AxiosResponse)=>response.data.data;

axios.interceptors.response.use(response=>{
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
                toast.error(data.title)
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
    get:(url:string)=>axios.get(url).then(responseBody),
    post:(url:string,body:{})=>axios.post(url,body).then(responseBody),
    put:(url:string,body:{})=>axios.put(url,body).then(responseBody),
    delete:(url:string)=>axios.delete(url).then(responseBody)
}

const Catalog={
    list:()=>requests.get('products/getproducts'),
    details:(id:number)=>requests.get(`products/getproductbyid/${id}`)
}

const Cart={
    get:()=>requests.get('cart/getcart'),
    addItem:(productId:number,quantity:number=1)=>requests.post(`cart/addtocart?productId=${productId}&quantity=${quantity}`,{}),
    removeItem:(productId:number,quantity:number=1)=>requests.delete(`cart/deletecart?productId=${productId}&quantity=${quantity}`)
}

const serverDebugger={
    get400Error:()=>requests.get('ErrorBroadcast/badrequest'),
    get401Error:()=>requests.get('ErrorBroadcast/unauthorized'),
    get404Error:()=>requests.get('ErrorBroadcast/notfound'),
    getApiError:()=>requests.get('ErrorBroadcast/servererror'),
    getValidationError:()=>requests.get('ErrorBroadcast/validationerror'),
}

const agent = {Catalog,Cart,serverDebugger}

export default agent;