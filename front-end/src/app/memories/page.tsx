
import Link from 'next/link';

export default function Memories() {
    return(
        <div className="drawer lg:drawer-open">
    <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
    <div className="drawer-content flex m-6">
      <div>Memories</div>
      <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">|||</label>
    
    </div> 
    <div className="drawer-side rounded-t-3xl rounded-b-3xl sm:rounded-t-3xl sm:rounded-b-3xl">
      <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label> 
      <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content round">
        {/* Sidebar content here */}
        <div className='mt-6 mr-2 items-center'>
        <li className='p-2 '><Link href="/" className='text-lg flex justify-center'>Home</Link></li>
        <li className='p-2'><Link href="/people" className='text-lg flex justify-center'>People</Link></li>
        <li className='p-2'><Link href="/places" className='text-lg flex justify-center'>Places</Link></li>
        <li className='p-2'><Link href="/memories" className='text-lg flex justify-center'>Memories</Link></li>
        </div>
      </ul>
    
    </div>
  </div>
    )
  }