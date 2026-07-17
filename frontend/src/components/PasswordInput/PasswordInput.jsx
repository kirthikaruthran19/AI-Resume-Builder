import { useState } from "react";

import { FaEye, FaEyeSlash } from "react-icons/fa";

import "./PasswordInput.css";

function PasswordInput({

    label,

    register,

    name,

    error,

    placeholder

}) {

    const [show,setShow]=useState(false);

    return(

        <div className="password-group">

            <label>

                {label}

            </label>

            <div className="password-box">

                <input

                    type={show?"text":"password"}

                    placeholder={placeholder}

                    {...register(name)}

                />

                <button

                    type="button"

                    onClick={()=>setShow(!show)}

                >

                    {

                        show

                        ?

                        <FaEyeSlash/>

                        :

                        <FaEye/>

                    }

                </button>

            </div>

            {

                error&&

                <small>

                    {error.message}

                </small>

            }

        </div>

    );

}

export default PasswordInput;