import storeData from '../data/store.json'
export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <div className="flex items-center justify-center h-16 text-sm text-accent">
      <span>&copy;{storeData.store.name}. {year}</span>
    </div>
  )
}
