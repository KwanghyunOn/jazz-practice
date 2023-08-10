export default function PracticeLayout(props: { children: React.ReactNode }) {
  return (
    <div className="container mx-auto h-full flex justify-center">
      <div>{props.children}</div>
    </div>
  )
}
