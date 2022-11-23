import { useRouter } from "next/router"
import { useState } from "react"
import Button from "../../atoms/buttons/Button"
import FullScreenModal from "../../layouts/FullScreenModal"
import TextField from "../../molecules/inputs/TextField"
import { FcGoogle } from "react-icons/fc"

export interface LoginProps {}
export default function Login(props: LoginProps) {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  return (
    <FullScreenModal heading="Sign in">
      <div className="p-6 h-full overflow-y-auto hide-scrollbar flex flex-col justify-start gap-4">
        <Button color="none" label="Sign in with Google" Icon={FcGoogle} />
        <div className="border-t border-light-4 my-2"></div>
        <div>
          <TextField
            label="Email"
            value={email}
            onChange={(key, value) => setEmail(value)}
          />
          <div>
            <TextField
              label="password"
              value={password}
              onChange={(key, value) => setPassword(value)}
            />
            <div className="text-blue-8 dark:text-blue-4" onClick={() => {}}>
              {"Forgot Password? "}
            </div>
          </div>
        </div>
        <Button color="blue" label="Sign in" />
        <div className="border-t border-light-4 my-2"></div>
        <div>
          <div className="text-center">{"Don't have an account?"}</div>
          <div
            className="text-blue-8 dark:text-blue-4 text-center"
            onClick={() => router.replace("/profile/sign-up")}
          >
            {"Sign up"}
          </div>
        </div>
      </div>
    </FullScreenModal>
  )
}
