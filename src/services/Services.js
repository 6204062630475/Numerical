import  tokenOne  from './tokenOne.json'

const Equation_API = async () => {
    const response = await fetch("http://localhost:4000/Equations"
        , {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: new URLSearchParams({
                'token': tokenOne,
            })
        }).then(res => {
            return res.json();
        })
    console.log(response);
    return response;

}
export {Equation_API};