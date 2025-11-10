import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

export default function Guard({ children }: any) {
  const nav = useNavigate()
  useEffect(() => {
    if (!localStorage.getItem("token")) nav("/login")
  }, [])
  return children
}