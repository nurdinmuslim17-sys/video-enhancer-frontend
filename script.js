const API="https://YOUR_BACKEND_URL";

async function register(){
  const res=await fetch(API+"/register",{
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify({
      email:document.getElementById("email").value,
      password:document.getElementById("pass").value,
      referral:document.getElementById("referral").value
    })
  });
  const data=await res.json();
  alert(data.message);
}

async function login(){
  const res=await fetch(API+"/login",{
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify({
      email:document.getElementById("email").value,
      password:document.getElementById("pass").value
    })
  });
  const data=await res.json();
  localStorage.setItem("token",data.token);
  document.getElementById("status").innerText="Login Success ✅";
  fetchBalance();
}

async function fetchBalance(){
  const res=await fetch(API+"/me",{
    headers:{Authorization:localStorage.getItem("token")}
  });
  const user=await res.json();
  document.getElementById("balance").innerText="Referral Balance: Rp "+user.referralBonus;
}

async function upload(){
  const file=document.getElementById("video").files[0];
  if(!file){alert("Pilih video!"); return;}
  const formData=new FormData();
  formData.append("video",file);
  const res=await fetch(API+"/process",{
    method:"POST",
    headers:{Authorization:localStorage.getItem("token")},
    body:formData
  });
  if(res.status===403){alert("Limit 1 video per 24 jam (Free)"); return;}
  const blob=await res.blob();
  window.open(URL.createObjectURL(blob));
}

async function upgrade(){
  const res=await fetch(API+"/create-payment",{
    method:"POST",
    headers:{Authorization:localStorage.getItem("token")}
  });
  const data=await res.json();
  alert("Payment Token: "+data.token+"\nSilahkan selesaikan di Midtrans Sandbox");
}

async function withdrawReferral(){
  const res=await fetch(API+"/withdraw-referral",{
    method:"POST",
    headers:{Authorization:localStorage.getItem("token")}
  });
  const data=await res.json();
  alert(data.message);
  fetchBalance();
}
