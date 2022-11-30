import Button from "../../atoms/buttons/Button"
import FullScreenModal from "../../layouts/FullScreenModal"
import TextField from "../../molecules/inputs/TextField"
import { FcGoogle } from "react-icons/fc"
import TextButton from "../../atoms/buttons/TextButton"
import Divider from "../../atoms/Divider"
import Info from "../../molecules/alerts/Info"
import { useAppDispatch, useAppSelector } from "../../../utils/hooks"
import { login, LoginFormData } from "../../../utils/slices/formData"
import { StringObj } from "../../../utils/types"

export interface LoginProps {
  onSubmit: (formData: LoginFormData) => void
  onSingUp: () => void
  onForgot: () => void
  errors: StringObj
}

export default function Login({ errors, onSubmit, onSingUp, onForgot }: LoginProps) {
  const formData = useAppSelector((state) => state.formData.login)
  const dispatch = useAppDispatch()

  const { email, password } = formData
  const { password: passErr, email: emailErr, form: formErr } = errors

  function handleFd(key: string, value: string) {
    dispatch(login({ ...formData, [key.toLowerCase()]: value }))
  }

  return (
    <FullScreenModal heading="Sign in">
      <div className="p-6 h-full overflow-y-auto hide-scrollbar flex flex-col justify-start">
        <Button color="none" label="Sign in with Google" Icon={FcGoogle} />
        <Divider space="4" />
        <div className="mb-6">
          <TextField label="Email" value={email} onChange={handleFd} error={emailErr} />
          <TextField
            type="password"
            label="password"
            value={password}
            onChange={handleFd}
            error={passErr}
          />
          <div className="-mt-2">
            <TextButton label="Forgot Password?" onClick={onForgot} />
          </div>
        </div>
        <Button color="blue" label="Sign in" onClick={() => onSubmit(formData)} />
        {!!formErr && <Info text={formErr} variant="error" />}
        <Divider space="4" />
        <div>
          <div className="text-center">
            {"Don't have an account?"}
            <TextButton label="Sign up" onClick={onSingUp} />
          </div>
        </div>
      </div>
    </FullScreenModal>
  )
}
