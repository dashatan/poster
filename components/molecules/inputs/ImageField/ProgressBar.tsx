export interface ProgressBarProps {
  progress: number
}
export default function ProgressBar({ progress }: ProgressBarProps) {
  return (
    <div className="w-3/4 h-1 rounded-lg border border-green-6">
      <div className={`w-[${progress}%] h-full bg-green-6`} />
    </div>
  )
}
