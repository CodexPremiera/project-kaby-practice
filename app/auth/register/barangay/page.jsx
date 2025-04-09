'use client'
import { useRouter } from "next/navigation";
import {useState} from 'react';
export default function BarangayRegisterPage() {
    const router = useRouter();
    const  [form, setForm] = useState({
        barangay_name : '',
        city : '',
        enail: '',
        message :''
    });

    const handleChange = (e) =>{
        setForm({...form, [e.target.name]: e.target.value});
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await fetch('/api/register/barangay', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(form),
        });
        const data = await res.json();
        if(res.ok){
            alert('Request submitted');
            router.push('/');
        }else{
            alert(`Error ${data.error}`);
        }
    };
    return (
        <div>
            <h1>Barangay Registration</h1>
            <form onSubmit={handleSubmit}>
                <input name="barangay_name" placeholder="Barangay Name" onChange={handleChange} required />
                <input name="city" placeholder="City" onChange={handleChange} required />
                <input name="email" placeholder="Email" type="email" onChange={handleChange} required />
                <textarea name="message" placeholder="Message" onChange={handleChange} required />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}
