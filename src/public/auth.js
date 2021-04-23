
export const saveToken = (token) => {
  localStorage.setItem('token', token)
}

export const getToken = () => {
  const value = localStorage.getItem('token')
  return (value && value !== 'undefined' && value !== 'null') ? value : null
}
