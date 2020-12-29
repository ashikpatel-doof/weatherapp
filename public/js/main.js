// console.log("Client Side java script ")
const getData= (address,btn)=>{
    
    
}

// const btn= document.querySelector('button')
// console.log(btn)
// const address  = document.getElementById('add');
// console.log(address)
document.querySelector('button').addEventListener('click',(e)=>{
    const btn = document.querySelector('button')
    const add = document.getElementById('add').value
    btn.disabled = true;
    btn.innerText = "processing"
    btn.className = 'btn-success'
    fetch(`http://localhost:3000/weather?address=${add}`).then((response)=>{
        response.json().then((data)=>{
            if(data.error){
                console.log(data.error)
              
                document.querySelector('.result1').textContent= data.error
                document.querySelector('.result2').textContent= ""
                document.querySelector('.result3').textContent= ""
            }else{
                document.querySelector('.result2').textContent= "Address : " +data.name;
                document.querySelector('.result3').textContent= "Condition as of Now: "+data.condition;
                document.querySelector('.result1').textContent= ''
                
            }
           
        }).then(()=>{
            btn.disabled = false;
            btn.innerText = "Get Weather Info"
        })
    }).catch((e)=>{
        console.log("errros is :", e)
    })
    e.preventDefault()
})


