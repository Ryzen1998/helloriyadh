export interface Serviceresponse<T>{
    data: T;
    success: boolean;
    message: string;
    responseCode: number;
}