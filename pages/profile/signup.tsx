import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { z } from "zod"
import FullScreenLoading from "../../components/layouts/FullScreenLoading"
import SignUp from "../../components/templates/phone/SignUp"
import useLocalStorage from "../../utils/customHooks/useLocalStorage"
import { isErrorWithData } from "../../utils/helpers"
import { useSignupMutation } from "../../utils/services/auth"
import { SignupFormData } from "../../utils/slices/formData"
import { StringObj } from "../../utils/types"

export interface SignUpProps {}

export default function SignUpPage(props: SignUpProps) {
  const router = useRouter()
  const ls = useLocalStorage()
  const [errors, setErrors] = useState<StringObj>({})
  const [signup] = useSignupMutation()

  const { isLoggedIn } = ls
  if (isLoggedIn === undefined) return <FullScreenLoading />
  if (isLoggedIn === true) {
    router.replace("/profile")
    return <FullScreenLoading />
  }

  const LoginSchema = z.object({
    name: z.string().min(3, "Name must contain at least 3 characters"),
    email: z.string().email("Email is not valid"),
    password: z.string().min(6, "Password must contain at least 6 characters"),
    accept: z.literal(true),
  })

  const route = {
    signin: () => router.replace("/profile/signin"),
    privacy: () => router.replace("/profile/privacy"),
    terms: () => router.replace("/profile/terms"),
    profile: () => router.replace("/profile"),
  }

  async function submit(formData: SignupFormData) {
    const { email, password, name } = formData
    const validation = LoginSchema.safeParse(formData)
    if (!validation.success) {
      const errs: StringObj = {}
      validation.error.issues.map((x) => (errs[x.path[0]] = x.message))
      setErrors(errs)
      return
    }
    const { form: formErr } = errors
    setErrors(formErr ? { form: formErr } : {})
    const data = { email, password, name }
    try {
      const payload = await signup(data).unwrap()
      ls.set.userToken(payload)
      route.profile()
    } catch (error) {
      if (isErrorWithData(error)) {
        const err: string = error.data
        setErrors((errors) => ({ ...errors, form: err }))
      }
    }
  }
  return (
    <SignUp
      errors={errors}
      onSingIn={route.signin}
      onPrivacy={route.privacy}
      onTerms={route.terms}
      onSubmit={submit}
    />
  )
}
