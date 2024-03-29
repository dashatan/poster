import FullScreenLoading from "components/layouts/FullScreenLoading"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import useAuth from "utils/customHooks/useAuth"
import { z } from "zod"
import SignUp from "../../components/templates/phone/SignUp"
import useLocalStorage from "../../utils/customHooks/useLocalStorage"
import { isErrorWithData } from "../../utils/helpers"
import { useSignupMutation } from "../../utils/services/auth"
import { SignupFormData } from "../../utils/slices/formData"
import { StringObj } from "../../utils/types"

export interface SignUpProps {}

export default function SignUpPage(props: SignUpProps) {
  const router = useRouter()
  const { isLoggedIn, setUserToken } = useAuth()
  const [errors, setErrors] = useState<StringObj>({})
  const [signup] = useSignupMutation()
  const [loading, setLoading] = useState(true)
  const [sending, setSending] = useState(false)

  useEffect(() => setLoading(false), [])

  const route = {
    signin: () => router.replace("/profile/signin"),
    privacy: () => router.replace("/profile/privacy"),
    terms: () => router.replace("/profile/terms"),
    profile: () => router.replace("/profile"),
  }
  useEffect(() => {
    if (isLoggedIn === true) route.profile()
  }, [isLoggedIn])

  const LoginSchema = z.object({
    name: z.string().min(3, "Name must contain at least 3 characters"),
    email: z.string().email("Email is not valid"),
    password: z.string().min(6, "Password must contain at least 6 characters"),
    accept: z.literal(true),
  })

  async function submit(formData: SignupFormData) {
    setSending(true)
    const { email, password, name } = formData
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
    const data = { email, password, name }
    try {
      const payload = await signup(data).unwrap()
      setUserToken(payload)
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
    <SignUp
      errors={errors}
      onSingIn={route.signin}
      onPrivacy={route.privacy}
      onTerms={route.terms}
      onSubmit={submit}
      loading={loading}
      sending={sending}
    />
  )
}
