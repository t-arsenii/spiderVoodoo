import React from 'react'
import { useAppDispatch, useAppSelector } from './store/hooks'
import { restoreSession, selectUserLoading } from './store/userSlice'
import RootLayout from './layouts/RootLayout'
import AppRouter from './routes/AppRouter'

function App() {
     const dispatch = useAppDispatch()
     // const loading = useAppSelector(selectUserLoading)

     React.useEffect(() => {
          dispatch(restoreSession())
     }, [dispatch])

     return (
          <RootLayout>
               <AppRouter />
          </RootLayout>
     )
}

export default App