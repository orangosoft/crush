import Calendar from "@/components/Calendar/Root"

export default function App() {
  return (
    <div class="p-8 grid gap-2">
      <div class="flex gap-4">
        <Calendar />
        <Calendar />
      </div>
    </div>
  )
}