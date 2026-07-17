import "./Input.css";

function Input({

    label,

    type = "text",

    placeholder,

    register,

    name,

    error

}) {

    return (

        <div className="input-group">

            <label>

                {label}

            </label>

            <input

                type={type}

                placeholder={placeholder}

                {...register(name)}

            />

            {

                error &&

                <small>

                    {error.message}

                </small>

            }

        </div>

    );

}

export default Input;