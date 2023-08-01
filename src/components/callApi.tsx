export const getApi = async () => {
  const res = await fetch('http://localhost:8000/posts')
  return res.json()
}
