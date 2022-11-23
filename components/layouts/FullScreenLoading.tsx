import Spinner from "../atoms/Spinner"
import FullScreenModal from "./FullScreenModal"

export interface FullScreenLoadingProps {}
export default function FullScreenLoading(props: FullScreenLoadingProps) {
  return (
    <FullScreenModal heading="Loading">
      <div className="w-full h-20 flex justify-center items-center">
        <div className="w-10 h-10">
          <Spinner />
        </div>
      </div>
    </FullScreenModal>
  )
}
