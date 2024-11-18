import React from 'react'

export default function FormContainer({hOnes, multipleInputs, multipleButtons, containerClasses}) {
    
  return (
    <div className={`h-screen w-screen p-20 ${containerClasses}`}>
      <form className='flex justify-center'>
        <div className='flex flex-col items-center'>
            {hOnes.map((hOne, i) => {
                return <h1 key={i} className={`mb-8 ${hOne.extraClasses}`}>{hOne.text}</h1>
            })}
            {multipleInputs.map((singleInput, i) => {
                return <input key={i} type={singleInput.type} onChange={(e) => singleInput.onChangeFunction(e.target.value)} value={singleInput.value} name={singleInput.name} placeholder={singleInput.placeHolder} required={singleInput.required} className={`border border-mainColor rounded-md shadow-lg px-4 py-3 mb-6 ${singleInput.extraClasses}`} />
            })}
            {multipleButtons.map((singleButton, i) => {
                return <button key={i} onClick={singleButton.click} className={`bg-btnColor text-mainTextColor rounded-md w-full px-6 py-3 ${singleButton.extraClasses}`} type={singleButton.type}>{singleButton.text}</button>
            })}
        </div>
      </form>
    </div>
  )
}
