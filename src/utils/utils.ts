export const getCookies=(key:string)=>{
    const regex = document.cookie.match("(^|;)\\s*" + key + "\\s*=\\s*([^;]+)");
    return regex ? regex.pop() : "";
}