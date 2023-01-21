export interface IconCardProps {
  icon?: string
  title: string
  onClick: () => void
}

export default function IconCard(props: IconCardProps) {
  const { title, onClick } = props
  const icon = props.icon
  const baseUrl = process.env.NEXT_PUBLIC_SERVICES_BASE_URL
  console.log(process.env.NODE_ENV)
  const url = `${baseUrl}/icons/${icon}.svg#${icon}`
  return (
    <div
      className="flex flex-col items-center justify-between w-12 gap-2"
      onClick={onClick}
    >
      <div className="flex items-center justify-center w-10 h-10 p-2 rounded-full bg-light-2 dark:bg-dark-6">
        <svg className="w-6 h-6 text-dark-6 dark:text-dark-4">
          <use href={url} />
        </svg>
      </div>
      <div className="flex justify-center w-10 text-sm text-dark-6 dark:text-dark-4">
        <span>{title}</span>
      </div>
    </div>
  )
}
