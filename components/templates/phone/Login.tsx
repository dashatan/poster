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
import { login, LoginFormData } from "../../../utils/slices/formData"
import { KeyValueObj } from "../../../utils/types"

export interface LoginProps {
  onSubmit: (formData: LoginFormData) => void
  errors: KeyValueObj[]
}

export default function Login({ errors, onSubmit }: LoginProps) {
  const router = useRouter()
  const loginFd = useAppSelector((state) => state.formData.login)
  const dispatch = useAppDispatch()
  const [formData, setFormData] = useState(loginFd)

  const { email, password } = formData

  function handleFd(key: string, value: string) {
    setFormData((fd) => ({ ...fd, [key.toLowerCase()]: value }))
    dispatch(login({ ...formData, [key.toLowerCase()]: value }))
  }

  const errOf = (key: string) => {
    console.log(errors)
    const error = errors.find((x) => x.key === key)
    if (!error) return ""
    return error.value
  }

  return (
    <FullScreenModal heading="Sign in">
      <div className="p-6 h-full overflow-y-auto hide-scrollbar flex flex-col justify-start">
        <Button color="none" label="Sign in with Google" Icon={FcGoogle} />
        <Divider space="4" />
        <div className="mb-6">
          <TextField label="Email" value={email} onChange={handleFd} />
          {/* {!!errOf("email") && (
            <div className="-mt-4">
              <Info text={errOf("email")} variant="error" />
            </div>
          )} */}
          <TextField
            type="password"
            label="password"
            value={password}
            onChange={handleFd}
          />
          <div className="-mt-2">
            <TextButton label="Forgot Password?" color="blue" />
          </div>
          {/* {!!errOf("password") && <Info text={errOf("password")} variant="error" />} */}
        </div>
        <Button color="blue" label="Sign in" onClick={() => onSubmit(formData)} />
        {!!errOf("form") && <Info text={errOf("form")} variant="error" />}
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
