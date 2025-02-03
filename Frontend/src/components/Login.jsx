

function Login() {
    return (
        <>
            <div className='bg-gray-900 min-h-screen flex flex-col items-center justify-center'>
                <div className='bg-gray-800 p-10 rounded-lg shadow-lg'>
                    <h1 className='text-white text-4xl mb-8'>Login</h1>
                    <div className='mb-4'>
                        <label className='text-white text-2xl block mb-2'>Username</label>
                        <input type='text' className='p-2 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500' />
                    </div>
                    <div className='mb-6'>
                        <label className='text-white text-2xl block mb-2'>Password</label>
                        <input type='password' className='p-2 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500' />
                    </div>
                    <button className='bg-blue-700 text-white p-2 w-full rounded-lg hover:bg-blue-800 transition duration-300'>Login</button>
                </div>
            </div>
        </>
    )
}

export default Login  