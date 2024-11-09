import React from 'react'
import Navbar from './Navbar'
import SearchSection from './SearchSection'

const Home = () => {


  return (
      <main  className='h-full'>
        <Navbar/>
        
        <div className='w-full h-[88%]   flex justify-between '>
          <section className='w-[40%] h-full '>
              <SearchSection/>
          </section>
          <section className='w-[60%] h-full bg-green-900'> smnbsmbc</section>
        </div>
      </main>

  )
}

export default Home
