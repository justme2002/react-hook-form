import { SubmitHandler, useFieldArray, useForm } from 'react-hook-form'
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from 'yup'

interface Hooby {
  name: string
}

interface IForm {
  firstName: string;
  lastName: string;
  age: number,
  hobbies: Hooby[]
}

const schema = yup.object().shape({
  firstName: yup.string().required().length(8),
  lastName: yup.string().required()
})

const App = () => {
  const { handleSubmit, register, formState: { errors }, getValues, control } = useForm<IForm>({
    mode: "onBlur",
    resolver: yupResolver(schema),
    defaultValues: {
      hobbies: [
        {
          name: ""
        },
        {
          name: ""
        }
      ]
    }
  })

  const { fields, append, prepend, remove } = useFieldArray({
    control: control,
    name: "hobbies"
  });

  const formSubmit: SubmitHandler<IForm> = (data) => {
    console.log(data)
  }

  return (
    <div>
      <form onSubmit={handleSubmit(formSubmit)}>
        <div>
          <label htmlFor="">Firstname</label>
          <input type="text" {...register("firstName")} />
        </div>
        <p>{errors.firstName?.message}</p>
        <div>
          <label htmlFor="">Lastname</label>
          <input type="text" id="lastname" {...register("lastName")} />
        </div>
        <p style={{ color: "red" }}>{errors.lastName?.message}</p>
        <div>
          <label htmlFor="">Age</label>
          <input type="text" id="age" placeholder='Hello' {...register("age")} />
        </div>
        <div>
          {fields.map((hobby, index) => {
            return (
              <div>
                <input type="text" {...register(`hobbies.${index}.name`)} />
              </div>
            )
          })}
          <div>
            <button onClick={() => append({
              name: getValues().age.toString()
            })}>Append</button>
          </div>
        </div>
        <button type='submit'>Save</button>
      </form>
    </div>
  )
}

export default App