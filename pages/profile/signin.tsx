import { useRouter } from "next/router"
import { z } from "zod"
import Login from "../../components/templates/phone/Login"
import { StringObj } from "../../utils/types"
import { useState } from "react"
import { useLoginMutation } from "../../utils/slices/api"
import { LoginFormData } from "../../utils/slices/formData"
import { isErrorWithData } from "../../utils/helpers"

export default function SignIn() {
  const router = useRouter()
  const [errors, setErrors] = useState<StringObj>({})
  const [send] = useLoginMutation()

  const route = {
    signup: () => router.replace("/profile/signup"),
    forgot: () => router.replace("/profile/forgot"),
  }

  const LoginSchema = z.object({
    email: z.string().email("Email is not valid"),
    password: z.string().min(6, "Password must contain at least 6 characters"),
  })

  async function submit(formData: LoginFormData) {
    const { email, password } = formData
    const validation = LoginSchema.safeParse(formData)
    if (!validation.success) {
      const errs: StringObj = {}
      validation.error.issues.map((x) => (errs[x.path[0]] = x.message))
      setErrors(errs)
      return
    }
    const { form: formErr } = errors
    setErrors(formErr ? { form: formErr } : {})
    const data = new FormData()
    data.append("email", email)
    data.append("password", password)
    try {
      const payload = await send({ data }).unwrap()
      const userToken = payload
    } catch (error) {
      if (isErrorWithData(error)) {
        const err: string = error.data
        setErrors((errors) => ({ ...errors, form: err }))
      }
    }
  }
  return (
    <Login
      errors={errors}
      onSubmit={submit}
      onSingUp={route.signup}
      onForgot={route.forgot}
    />
  )
}
