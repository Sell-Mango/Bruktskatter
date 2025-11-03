export default function (variable: any){
    return typeof variable === 'object' && variable !== null;
}