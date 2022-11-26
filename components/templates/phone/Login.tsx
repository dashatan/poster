import { useRouter } from "next/router"
import { useState } from "react"
import Button from "../../atoms/buttons/Button"
import FullScreenModal from "../../layouts/FullScreenModal"
import TextField from "../../molecules/inputs/TextField"
import { FcGoogle } from "react-icons/fc"
import TextButton from "../../atoms/buttons/TextButton"
import Divider from "../../atoms/Divider"
import Info from "../../molecules/alerts/Info"
import validateEmail from "../../../utils/customHooks/validateEmail"
import { useAppDispatch, useAppSelector } from "../../../utils/hooks"
import { login } from "../../../utils/slices/formData"
import { useLoginMutation } from "../../../utils/slices/api"

export interface LoginProps {}

export default function Login(props: LoginProps) {
  const router = useRouter()
  const loginFd = useAppSelector((state) => state.formData.login)
  const dispatch = useAppDispatch()
  const [send] = useLoginMutation()
  const [formData, setFormData] = useState({
    email: loginFd.email,
    password: loginFd.password,
    error: "",
  })
  const { error, email, password } = formData

  async function submit() {
    if (email === "" || password === "") {
      handleFd("error", "Email and Password is required")
      return
    }
    if (!validateEmail(email)) {
      handleFd("error", "Email is not correct")
      return
    }
    if (password.length < 6) {
      handleFd("error", "Password should be more than 6 characters")
      return
    }
    handleFd("error", "")
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
      <div className="p-6 h-full overflow-y-auto hide-scrollbar flex flex-col justify-start gap-4">
        <Button color="none" label="Sign in with Google" Icon={FcGoogle} />
        <Divider />
        <div>
          <div>
            <TextField label="Email" value={email} onChange={handleFd} />
          </div>
          <div>
            <TextField label="password" value={password} onChange={handleFd} />
            <TextButton label="Forgot Password?" color="blue" />
          </div>
        </div>
        <Button color="blue" label="Sign in" onClick={submit} />
        {!!error && <Info text={error} variant="error" />}
        <Divider />
        <div>
          <div className="text-center">
            {"Don't have an account?"}
            <TextButton
              label="Sign up"
              color="blue"
              onClick={() => router.replace("/profile/sign-up")}
            />
          </div>
        </div>
      </div>
    </FullScreenModal>
  )
}
