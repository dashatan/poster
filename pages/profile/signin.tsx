import { useRouter } from "next/router"
import { z } from "zod"
import Login from "../../components/templates/phone/Login"
import { StringObj } from "../../utils/types"
import { useEffect, useState } from "react"
import { LoginFormData } from "../../utils/slices/formData"
import { isErrorWithData } from "../../utils/helpers"
import { useLoginMutation } from "../../utils/services/auth"
import useLocalStorage from "../../utils/customHooks/useLocalStorage"

export default function SignIn() {
  const router = useRouter()
  const ls = useLocalStorage()
  const [errors, setErrors] = useState<StringObj>({})
  const [send] = useLoginMutation()
  const [loading, setLoading] = useState(true)
  const [sending, setSending] = useState(false)

  useEffect(() => setLoading(false), [])

  const route = {
    signup: () => router.replace("/profile/signup"),
    forgot: () => router.replace("/profile/forgot"),
    profile: () => router.replace("/profile"),
  }

  if (ls.isLoggedIn === true) route.profile()

  const LoginSchema = z.object({
    email: z.string().email("Email is not valid"),
    password: z.string().min(6, "Password must contain at least 6 characters"),
  })

  async function submit(formData: LoginFormData) {
    setSending(true)
    const { email, password } = formData
    const validation = LoginSchema.safeParse(formData)
    if (!validation.success) {
      const errs: StringObj = {}
      validation.error.issues.map((x) => (errs[x.path[0]] = x.message))
      setErrors(errs)
      setSending(false)
      return
    }
    const { form: formErr } = errors
    setErrors(formErr ? { form: formErr } : {})
    const data = { email, password }
    try {
      const payload = await send(data).unwrap()
      ls.set.userToken(payload)
      route.profile()
    } catch (error) {
      if (isErrorWithData(error)) {
        const err: string = error.data
        setErrors((errors) => ({ ...errors, form: err }))
      }
    }
    setSending(false)
  }

  return (
    <Login
      errors={errors}
      onSubmit={submit}
      onSingUp={route.signup}
      onForgot={route.forgot}
      loading={loading}
      sending={sending}
    />
  )
}
