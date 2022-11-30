import Button from "../../atoms/buttons/Button"
import FullScreenModal from "../../layouts/FullScreenModal"
import TextField from "../../molecules/inputs/TextField"
import { FcGoogle } from "react-icons/fc"
import { StringObj } from "../../../utils/types"
import { signUp, SignupFormData } from "../../../utils/slices/formData"
import { useAppDispatch, useAppSelector } from "../../../utils/hooks"
import TextButton from "../../atoms/buttons/TextButton"
import Info from "../../molecules/alerts/Info"
import CheckBoxSimple from "../../molecules/inputs/CheckBoxSimple"

export interface SignUpProps {
  onSubmit: (formData: SignupFormData) => void
  onSingIn: () => void
  onTerms: () => void
  onPrivacy: () => void
  errors: StringObj
}
export default function SignUp({
  errors,
  onSingIn,
  onSubmit,
  onPrivacy,
  onTerms,
}: SignUpProps) {
  const formData = useAppSelector((state) => state.formData.signUp)
  const dispatch = useAppDispatch()

  const { email, password, name, accept } = formData
  const {
    password: passErr,
    email: emailErr,
    form: formErr,
    accept: acceptErr,
    name: nameErr,
  } = errors

  function handleFd(key: string, value: string | number | boolean) {
    dispatch(signUp({ ...formData, [key.toLowerCase()]: value }))
  }
  return (
    <FullScreenModal heading="Sign up">
      <div className="p-6 h-full overflow-y-auto hide-scrollbar flex flex-col justify-start gap-4">
        <Button color="none" label="Sign up with Google" Icon={FcGoogle} />
        <div className="border-t border-light-4 my-2"></div>
        <div>
          <TextField label="Name" value={name} onChange={handleFd} error={nameErr} />
          <TextField label="Email" value={email} onChange={handleFd} error={emailErr} />
          <TextField
            label="Password"
            value={password}
            onChange={handleFd}
            error={passErr}
          />
          <div>
            <CheckBoxSimple name="accept" value={accept} onChange={handleFd}>
              <div className="flex gap-2">
                {"I agree with"}
                <TextButton label="Terms" onClick={onTerms} />
                {"and"}
                <TextButton label="Privacy" onClick={onPrivacy} />
              </div>
            </CheckBoxSimple>
          </div>
        </div>
        <div>
          <Button color="green" label="Sign up" onClick={() => onSubmit(formData)} />
          {!!formErr && <Info text={formErr} variant="error" />}
          {!!acceptErr && (
            <Info text="You must accept Terms and Conditions" variant="error" />
          )}
        </div>
        <div className="border-t border-light-4 my-2"></div>
        <div>
          <div className="text-center">
            {"Already have an account?"}
            <TextButton label="Sign in" onClick={onSingIn} />
          </div>
        </div>
      </div>
    </FullScreenModal>
  )
}
