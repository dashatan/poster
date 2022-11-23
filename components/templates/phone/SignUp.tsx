import { useRouter } from "next/router"
import { useState } from "react"
import Button from "../../atoms/buttons/Button"
import FullScreenModal from "../../layouts/FullScreenModal"
import TextField from "../../molecules/inputs/TextField"
import { FcGoogle } from "react-icons/fc"
import { BsCircle, BsSquare } from "react-icons/bs"

export interface SignUpProps {}
export default function SignUp(props: SignUpProps) {
  const router = useRouter()
  const [email, setEmail] = useState("")
  return (
    <FullScreenModal heading="Sign up">
      <div className="p-6 h-full overflow-y-auto hide-scrollbar flex flex-col justify-start gap-4">
        <Button color="none" label="Sign up with Google" Icon={FcGoogle} />
        <div className="border-t border-light-4 my-2"></div>
        <div>
          <TextField
            label="Name"
            value={email}
            onChange={(key, value) => setEmail(value)}
          />
          <TextField
            label="Email"
            value={email}
            onChange={(key, value) => setEmail(value)}
          />
          <TextField
            label="Password"
            value={email}
            onChange={(key, value) => setEmail(value)}
          />
          <div className="flex items-center gap-4 my-4">
            <div>
              <BsSquare className="w-4 h-4" />
            </div>
            <div>{"I agree with Terms and Privacy"}</div>
          </div>
        </div>
        {/* <div className="border-t border-light-4 my-2"></div> */}
        <Button color="green" label="Sign up" />
        <div className="border-t border-light-4 my-2"></div>
        <div>
          <div className="text-center">{"Already have an account?"}</div>
          <div
            className="text-blue-8 dark:text-blue-4 text-center"
            onClick={() => router.replace("/profile/sign-in")}
          >
            {"Sign in"}
          </div>
        </div>
      </div>
    </FullScreenModal>
  )
}
