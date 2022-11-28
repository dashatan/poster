import { z } from "zod"
import Login from "../../components/templates/phone/Login"
import { KeyValueObj } from "../../utils/types"
import { useState } from "react"
import { useLoginMutation } from "../../utils/slices/api"
import { LoginFormData } from "../../utils/slices/formData"

export default function SignIn() {
  const [errors, setErrors] = useState<KeyValueObj[]>([])
  const [send] = useLoginMutation()

  const LoginSchema = z.object({
    email: z.string().email("Email is not valid"),
    password: z.string().min(6, "Password must contain at least 6 characters"),
  })

  async function submit(formData: LoginFormData) {
    const { email, password } = formData
    const validation = LoginSchema.safeParse(formData)
    if (!validation.success) {
      setErrors(
        validation.error.issues.map((x) => ({
          key: x.path[0].toString(),
          value: x.message,
        }))
      )
      return
    }
    setErrors([])
    const fd = new FormData()
    fd.append("email", email)
    fd.append("password", password)
    send({ data: fd }).then((res) => {
      if ("data" in res) {
        const userToken = res.data
      } else {
        const error: string = "data" in res.error ? res.error.data : ""
        setErrors((errors) => [...errors, { key: "form", value: error }])
      }
    })
  }
  return <Login errors={errors} onSubmit={submit} />
}
