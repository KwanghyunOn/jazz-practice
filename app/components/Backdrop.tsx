export default function Backdrop({
  onClick,
}: {
  onClick?: React.MouseEventHandler
}) {
  return <div className="fixed inset-0" onClick={onClick}></div>
}
