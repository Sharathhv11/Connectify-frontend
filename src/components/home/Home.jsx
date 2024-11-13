import React from 'react'
import Navbar from './Navbar'
import SearchSection from './SearchSection'

const Home = () => {


  return (
      <main  className='h-full min-h-max'>
        <Navbar/>
        
        <div className='w-full h-[88%]  min-h-max flex justify-between '>
          <section className='w-[40%] h-full message-list-section border-r-[1px] border-black '>
              <SearchSection/>
          </section>
          <section className='w-[60%] h-full  message-section'> 
            <div className='w-full h-[60px] bg-purple'></div>
          </section>
        </div>
      </main>

  )
}

export default Home
