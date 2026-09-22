import React from "react";
import { useState, useEffect } from "react";

const Register = () => {

    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);

    const [form, setForm] = useState({
        username: "",
        email: "",
        password: "",
        token: ""
    });

    const RegisterChange = (e) => {

        setForm({
            username: "",
            email: "",
            password: "",
            token: ""
        });

        setError("");

    };

    const OnRegister = (e) => {
        e.preventDefault();

        if (!form.username || !form.email || !form.password || !form.token) {
            setError('Неверные данные');
            return;
        };

        

    };

    return (    

        <main>
        


        </main>

    );

};