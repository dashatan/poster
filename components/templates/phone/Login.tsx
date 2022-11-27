import { useRouter } from "next/router"
import { useState } from "react"
import Button from "../../atoms/buttons/Button"
import FullScreenModal from "../../layouts/FullScreenModal"
import TextField from "../../molecules/inputs/TextField"
import { FcGoogle } from "react-icons/fc"
import TextButton from "../../atoms/buttons/TextButton"
import Divider from "../../atoms/Divider"
import Info from "../../molecules/alerts/Info"
import { useAppDispatch, useAppSelector } from "../../../utils/hooks"
import { login } from "../../../utils/slices/formData"
import { useLoginMutation } from "../../../utils/slices/api"
import { z } from "zod"
import { KeyValueObj } from "../../../utils/types"

export interface LoginProps {}

export default function Login(props: LoginProps) {
  const router = useRouter()
  const loginFd = useAppSelector((state) => state.formData.login)
  const dispatch = useAppDispatch()
  const [send] = useLoginMutation()
  const [formData, setFormData] = useState({
    email: loginFd.email,
    password: loginFd.password,
  })
  const [errors, setErrors] = useState<KeyValueObj[]>([])
  const { email, password } = formData

  const LoginSchema = z.object({
    email: z.string().email("Email is not valid"),
    password: z.string().min(6, "Password must contain at least 6 characters"),
  })

  async function submit() {
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
    try {
      const res = await send(fd)
      console.log(res)
    } catch (err) {
      console.log(err)
    }
  }

  function handleFd(key: string, value: string) {
    setFormData((fd) => ({ ...fd, [key.toLowerCase()]: value }))
    dispatch(login({ ...formData, [key.toLowerCase()]: value }))
  }

  return (
    <FullScreenModal heading="Sign in">
      <div className="p-6 h-full overflow-y-auto hide-scrollbar flex flex-col justify-start">
        <Button color="none" label="Sign in with Google" Icon={FcGoogle} />
        <Divider space="4" />
        <div className="mb-6">
          <TextField label="Email" value={email} onChange={handleFd} />
          {errors.map(
            (x) =>
              x.key === "email" && (
                <div className="-mt-4">
                  <Info text={x.value} variant="error" />
                </div>
              )
          )}

          <TextField
            type="password"
            label="password"
            value={password}
            onChange={handleFd}
          />
          <div className="-mt-2">
            <TextButton label="Forgot Password?" color="blue" />
          </div>
          {errors.map(
            (x) => x.key === "password" && <Info text={x.value} variant="error" />
          )}
        </div>
        <Button color="blue" label="Sign in" onClick={submit} />
        <Divider space="4" />
        <div>
          <div className="text-center">
            {"Don't have an account?"}
            <TextButton
              label="Sign up"
              onClick={() => router.replace("/profile/sign-up")}
            />
          </div>
        </div>
      </div>
    </FullScreenModal>
  )
}
