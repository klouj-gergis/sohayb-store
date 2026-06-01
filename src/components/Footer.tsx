
export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <div className="flex items-center justify-center h-16 text-sm text-accent">
      <span>&copy;Angels for Candles. {year}</span>
    </div>
  )
}
