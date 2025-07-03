'use server';


export default async function CreateAccount({email, password, password2, firstname, lastname, phone}) {
  try{
    const res = await fetch('http://127.0.0.1:8000/api/auth/registration/', {
      method: 'POST',
      body: JSON.stringify({
        'email': email,
        'password1': password,
        'password2':password2,
        'first_name': firstname,
        'last_name': lastname,
        'phone': phone,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
      return res.status;
  }
  catch (err) {
    return res.status;
  }
}
