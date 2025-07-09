'use server';


export default async function CreateAccount({email, password, password2, firstname, lastname, phone}) {
  try{
    const res = await fetch(`${process.env.API_URL}api/auth/registration/`, {
      method: 'POST',
      body: JSON.stringify({
        'email': email,
        'password1': password,
        'password2':password2,
        'first_name': firstname,
        'last_name': lastname,
        'phone_number': phone,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
      console.log(await res.json());
      return res.status;
  }
  catch (err) {
    return res.status;
  }
}
