import DesktopLayout from "components/layouts/DesktopLayout"
import FullScreenLoading from "components/layouts/FullScreenLoading"
import FullScreenModal from "components/layouts/FullScreenModal"
import DesktopTopHeader from "components/organisms/headers/DesktopTopHeader"
import SinglePost from "components/templates/phone/SinglePost"
import { useRouter } from "next/router"
import useResponsive from "utils/customHooks/useResponsive"
import { usePostQuery } from "utils/services/posts"

export default function PostSinglePage() {
  const router = useRouter()
  const { isMobile } = useResponsive()
  const slugs = (router.query.id as string[]) || []
  const id = slugs[slugs.length - 1]
  const { data, isFetching } = usePostQuery({ id })

  if (isFetching || !data) return <FullScreenLoading />

  if (!isMobile)
    return (
      <DesktopLayout
        top={<DesktopTopHeader />}
        main={
          <div className="h-full w-full flex justify-center overflow-y-auto hide-scrollbar">
            <div className="w-96 h-full">
              <SinglePost post={data} />
            </div>
          </div>
        }
      />
    )

  return (
    <FullScreenModal heading={data.title}>
      <div className="h-full w-full flex justify-center overflow-y-auto hide-scrollbar">
        <SinglePost post={data} />
      </div>
    </FullScreenModal>
  )
}
