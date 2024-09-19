import { useAppSelector } from '@store/hooks';
import React from 'react'

function Home() {
  const { loading, error, user, accessToken } = useAppSelector((state) => state.auth);

  console.log({ loading, error, user, accessToken })

  return (
    <div>
      Home
    </div>
  )
}

export default Home
