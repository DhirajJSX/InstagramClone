import React from 'react'
import IGimg from "./../img/LoginPage/instagram.png"
import FacebookRoundedIcon from '@mui/icons-material/FacebookRounded';
import GooglePlay from "./../img/LoginPage/playstore.png"
import Microsoft from "./../img/LoginPage/microsoft.png"
function LoginForm() {


    const FooterTerms = [
        {
            label: 'Meta',
            href: '#'
        },
        {
            label: 'About',
            href: '#'
        },
        {
            label: 'blog',
            href: '#'
        },
        {
            label: 'Jobs',
            href: '#'
        },
        {
            label: 'Help',
            href: '#'
        },
        {
            label: 'Privacy',
            href: '#'
        },
        {
            label: 'Terms',
            href: '#'
        },
        {
            label: 'Locations',
            href: '#'
        },
        {
            label: 'Instagram Lite',
            href: '#'
        },
        {
            label: 'Threads',
            href: '#'
        },
        {
            label: 'Contact Uploading & Non-Users',
            href: '#'
        },
        {
            label: 'Meta Verified',
            href: '#'
        }
    ];

    const Languages = [
        { label: 'English', value: 'en' },
        { label: 'Spanish', value: 'es' },
        { label: 'French', value: 'fr' },
        { label: 'German', value: 'de' },
        { label: 'Chinese (Simplified)', value: 'zh-CN' },
        { label: 'Chinese (Traditional)', value: 'zh-TW' },
        { label: 'Hindi', value: 'hi' },
        { label: 'Arabic', value: 'ar' },
        { label: 'Portuguese', value: 'pt' },
        { label: 'Russian', value: 'ru' },
        { label: 'Japanese', value: 'ja' },
        { label: 'Korean', value: 'ko' },
        { label: 'Italian', value: 'it' },
        { label: 'Dutch', value: 'nl' },
        { label: 'Turkish', value: 'tr' },
        { label: 'Thai', value: 'th' },
        { label: 'Swedish', value: 'sv' },
        { label: 'Greek', value: 'el' },
        { label: 'Hebrew', value: 'he' },
        { label: 'Bengali', value: 'bn' },
        { label: 'Punjabi', value: 'pa' },
        { label: 'Tamil', value: 'ta' },
        { label: 'Urdu', value: 'ur' },
        { label: 'Vietnamese', value: 'vi' },
        { label: 'Indonesian', value: 'id' },
        { label: 'Malay', value: 'ms' },
        { label: 'Polish', value: 'pl' },
        { label: 'Ukrainian', value: 'uk' },
        { label: 'Czech', value: 'cs' },
        { label: 'Hungarian', value: 'hu' },
        { label: 'Finnish', value: 'fi' },
        { label: 'Danish', value: 'da' },
        { label: 'Norwegian', value: 'no' },
        { label: 'Filipino', value: 'tl' },
        { label: 'Romanian', value: 'ro' },
        { label: 'Swahili', value: 'sw' },
        { label: 'Gujarati', value: 'gu' },
        { label: 'Marathi', value: 'mr' }
    ];
    

  return (
    <div className='flex items-center  flex-col justify-center min-h-screen bg-black'>
        <div className='border-gray-700 border text-white p-5 px-10'>
            <div className=' flex justify-center py-6 pt-10'>
            <img className=' w-[200px] items-center' src={IGimg} alt="" />
            </div>
            <div className=' flex flex-col text-[14px]'>
                <input className=' mt-3 bg-[#121212] py-2.5 px-3 w-[340px] rounded-lg outline-none border-[1px] border-slate-300' placeholder='Phone number,username, or email' type="text" name="" id="" />
                <input  className='mt-3 bg-[#121212] py-2.5 px-3 w-[340px] rounded-lg outline-none border-[1px] border-slate-300' placeholder='Password' type="password" name="" id="" />
             </div>
             <div>
                <button className='mt-4 w-[340px] rounded-[10px]  text-white bg-blue-600 hover:bg-blue-500 py-2 font-Poppins'>Log in</button>
             </div>
             <div class="flex items-center px-2 mt-5 font-Poppins">
                <div class="flex-grow border-t border-gray-600 "></div>
                <span class="mx-4 text-white opacity-70">OR</span>
                <div class="flex-grow border-t border-gray-600"></div>
            </div>
            
            <div className='flex flex-col justify-center items-center'>
                <div className=' p-5'>
                    <FacebookRoundedIcon fontSize="large" className='w-[50px] h-[50px] text-[#0095F6]' />
                    <span className='ml-2 text-[#0095F6] hover:text-white cursor-pointer'>Log in with Facebook</span>
                </div>
                <button className=' text-center text-gray-200'>Forger Password?</button>
            </div>
        </div>
        
        <div className='border-gray-700 border text-white  mt-4'>
            <div className='p-5 px-10  text-[16px] w-[420px] flex justify-center'>
                <span>Don't have an account? <button className='font-Poppins text-[#0095f6]'> Sign up</button></span>
                
            </div>
        </div>
        
        <div className=' text-white '>
            <div className='text-center mt-6 mb-2 '>
                <span className='text-[16px] '>Get the app.</span>
            </div>
            <div className='flex items-center p-1 justify-center'>
                <img className=' w-[170px] cursor-pointer p-1 items-center' src={GooglePlay} alt="" />
                <img className=' w-[150px] cursor-pointer h-[56px] p-1 items-center' src={Microsoft} alt="" />
            </div>
        </div>

        <div className='flex justify-around m-10 text-[13px]'>
           <div className='flex '>
           {   
                FooterTerms.map((term, index) => (
                    <div key={index} className='p-2 cursor-pointer text-gray-400 hover:text-gray-300 hover:underline'>
                        {term.label}
                    </div>
                ))
            }
           </div>
            <div className="flex flex-col ">
                <select className="p-2 border rounded-md bg-black  cursor-pointer outline-none text-gray-400">
                    {Languages.map((lang, index) => (
                    <option key={index} value={lang.value} className="">
                        {lang.label}
                    </option>
                    ))}
                </select>
            </div>
        </div>
    </div>
  )
}

export default LoginForm
